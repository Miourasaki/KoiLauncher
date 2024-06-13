import { mainWindow } from './mainWindow'
import { BrowserWindow, session } from 'electron'
import icon from '../../resources/icon.png?asset'
import randomString from './utils/randomString'

export let msWindow: BrowserWindow

const microsoftLogin = (event: Electron.IpcMainEvent): void => {
  const msState = `koil.ms.${randomString(16)}`

  msWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    parent: mainWindow,
    autoHideMenuBar: true,
    maximizable: false,
    resizable: false,
    title: '登录 Minecraft',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#24292e00',
      symbolColor: '#fff'
    },
    webPreferences: {
      // session: session.fromPartition(`persist:${msState}`)
    },
    ...(process.platform === 'linux' ? { icon } : {})
  })
  msWindow
    // .loadURL(
    //   'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?\n' +
    //     'client_id=8641ebba-d3dd-48a2-8d05-30262674f7e5\n' +
    //     '&response_type=code\n' +
    //     '&redirect_uri=https://login.live.com/oauth20_desktop.srf\n' +
    //     '&response_mode=query\n' +
    //     '&scope=XboxLive.signin\n'
    // )
    .loadURL(
      'https://login.live.com/oauth20_authorize.srf' +
        '?client_id=00000000402b5328' +
        '&response_type=code' +
        '&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL' +
        '&redirect_uri=https%3A%2F%2Flogin.live.com%2Foauth20_desktop.srf' +
        '&state=' +
        msState
    )
    .then(() => msWindow.show())
    .catch(() => {})
  const msClose = (): void => {
    msWindowOff()
    event.reply('oauth:ms-out', 'error:Window Be Close')
  }
  const msWindowOff = () => {
    msWindow.off('close', msClose)
    msWindow.off('minimize', msClose)
  }
  msWindow.on('close', msClose)
  msWindow.on('minimize', msClose)
  msWindow.webContents.on('did-navigate', (_event, url) => {
    const windowUrl = new URL(url)
    msLoginEnd(windowUrl)
  })

  const msLoginEnd = (windowUrl: URL, catchNet: boolean = false): void => {
    if (windowUrl.pathname == '/oauth20_desktop.srf') {
      if (windowUrl.searchParams.has('code') && windowUrl.searchParams.has('state')) {
        if (windowUrl.searchParams.get('state') != msState) {
          msWindowOff()
          msWindow.close()
          event.reply('oauth:ms-out', `error:Return field does not match`)
        }
        msWindowOff()
        msWindow.close()
        const tokenCode = windowUrl.searchParams.get('code')
        if (tokenCode)
          getMicrosoftToken(tokenCode)
            .then((r) => event.reply('oauth:ms-out', `token:${r}`))
            .catch((r) => event.reply('oauth:ms-out', `error:${r}`))
      }
    } else if (
      windowUrl.searchParams.has('error') &&
      windowUrl.searchParams.has('error_description')
    ) {
      msWindowOff()
      msWindow.close()
      event.reply('oauth:ms-out', `error:${windowUrl.searchParams.get('error_description')}`)
    } else if (catchNet) {
      msWindowOff()
      msWindow.close()
      event.reply('oauth:ms-out', `error:Network Error`)
    }
  }
}
const log = (s: string = ''): void => {
  console.log(s)
}
const getMicrosoftToken = (code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ApiError = (_e: Response): void => {
      reject('Api Request failed')
    }
    log('Minecraft Token get Program Start')
    const dataGetMsToken = new URLSearchParams()
    dataGetMsToken.append('client_id', '00000000402b5328')
    dataGetMsToken.append('code', code)
    dataGetMsToken.append('grant_type', 'authorization_code')
    dataGetMsToken.append('redirect_uri', 'https://login.live.com/oauth20_desktop.srf')
    dataGetMsToken.append('scope', 'service::user.auth.xboxlive.com::MBI_SSL')
    const headersGetMsToken = new Headers()
    headersGetMsToken.append('ContentType', 'application/x-www-form-urlencoded')
    headersGetMsToken.append('content-type', 'application/x-www-form-urlencoded')
    headersGetMsToken.append('user-agent', `KoiLauncher/${process.env.npm_package_version}`)

    const configGetMsToken: RequestInit = {
      method: 'POST',
      headers: headersGetMsToken,
      body: dataGetMsToken,
      redirect: 'follow'
    }
    log('- get microsoft assess token start from code ' + code)
    fetch('https://login.live.com/oauth20_token.srf', configGetMsToken)
      .then((r) => r.text())
      .then((r) => {
        const result = JSON.parse(r)
        const msAccessToken = result.access_token
        const msRefreshToken = result.refresh_token
        log('| accessToken - ' + msAccessToken)
        log('| refreshToken - ' + msRefreshToken)
        log('- get microsoft assess token done')
        log()
        getMinecraftToken(msAccessToken)
          .then((r) => {
            log(r)
            resolve(r.access_token)
          })
          .catch((err) => ApiError(err))
      })
      .catch((e) => ApiError(e))
  })
}

const getMinecraftToken = (msAccessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const headersGetXboxToken = new Headers()
    headersGetXboxToken.append('ContentType', 'application/json')
    headersGetXboxToken.append('content-type', 'application/json')
    headersGetXboxToken.append('Accept', 'application/json')
    headersGetXboxToken.append('user-agent', `KoiLauncher/${process.env.npm_package_version}`)
    log('- get xbox token start from MS Assess TOKEN')
    fetch('https://user.auth.xboxlive.com/user/authenticate', {
      headers: headersGetXboxToken,
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify({
        Properties: {
          AuthMethod: 'RPS',
          SiteName: 'user.auth.xboxlive.com',
          RpsTicket: `d=${msAccessToken}` // 第二步中获取的访问令牌
        },
        RelyingParty: 'http://auth.xboxlive.com',
        TokenType: 'JWT'
      })
    })
      .then((r) => r.text())
      .then((r) => {
        const result = JSON.parse(r)
        const xboxToken = result.Token
        const xboxUserHash = result.DisplayClaims.xui[0].uhs
        log('| xboxToken - ' + xboxToken)
        log('| xboxUserHash - ' + xboxUserHash)
        log('- get xbox token token done')
        log()

        log('- get xsts token start from xbox token')
        fetch('https://xsts.auth.xboxlive.com/xsts/authorize', {
          headers: headersGetXboxToken,
          method: 'POST',
          redirect: 'follow',
          body: JSON.stringify({
            Properties: {
              SandboxId: 'RETAIL',
              UserTokens: [
                'xbl_token' // 上面得到的XBL令牌
              ]
            },
            RelyingParty: 'rp://api.minecraftservices.com/',
            TokenType: 'JWT'
          })
        })
          .then((r) => r.text())
          .then((r) => {
            const result = JSON.parse(r)
            const xstsToken = result.Token
            const xstsUserHash = result.DisplayClaims.xui[0].uhs
            log('| xstsToken - ' + xstsToken)
            log('| xstsUserHash - ' + xstsUserHash)
            log('- get xsts token token done')
            log()

            log('- get minecraft assess token start from xsts token')
            fetch('https://api.minecraftservices.com/authentication/login_with_xbox', {
              headers: headersGetXboxToken,
              method: 'POST',
              redirect: 'follow',
              body: JSON.stringify({
                identityToken: `XBL3.0 x=${xstsUserHash};${xstsToken}`
              })
            })
              .then((r) => r.text())
              .then((r) => {
                const result = JSON.parse(r)
                const mcUsername = result.username
                const accessToken = result.accessToken
                log('| mcUsername - ' + mcUsername)
                log('| accessToken - ' + accessToken)
                log('- All Down, Back Token')
                log()
                resolve(result)
              })
              .catch((e) => reject(e))
          })
          .catch((e) => reject(e))
      })
      .catch((e) => reject(e))
  })
}
export default microsoftLogin
