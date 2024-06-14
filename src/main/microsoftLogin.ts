import { mainWindow } from './mainWindow'
import { BrowserWindow, session } from 'electron'
import icon from '../../resources/icon.png?asset'
import randomString from './utils/randomString'

export let msWindow: BrowserWindow

const microsoftLogin = (event: Electron.IpcMainEvent): void => {
  const msState = `koil.ms.${randomString(16)}`

  msWindow = new BrowserWindow({
    width: 900,
    height: 572,
    minWidth: 900,
    minHeight: 572,
    maxWidth: 900,
    maxHeight: 572,
    show: false,
    parent: mainWindow,
    autoHideMenuBar: true,
    maximizable: false,
    resizable: false,
    title: '登录 Minecraft',
    frame: false,
    // transparent: true,
    // titleBarStyle: 'hidden',
    // titleBarOverlay: {
    //   color: '#24292e00',
    //   symbolColor: '#fff'
    // },
    webPreferences: {
      session: session.fromPartition(`persist:${msState}`)
    },
    ...(process.platform === 'linux' ? { icon } : {})
  })
  const changMsWindowPosition = (): void => {
    const mainWindowPosition = mainWindow.getPosition()
    msWindow.setPosition(mainWindowPosition[0], mainWindowPosition[1] + 28)
    msWindow.setSize(900, 572)
  }
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
    .then(() => {
      changMsWindowPosition()
      msWindow.show()
      mainWindow.on('move', changMsWindowPosition)
    })
    .catch(() => {
      msWindowOff()
      event.reply('oauth:ms-out', 'error:i18n|error.msAccount.window.networkError')
    })
  const msClose = (): void => {
    msWindowOff()
    event.reply('oauth:ms-out', 'error:none|Window Be Close')
  }
  const msWindowOff = () => {
    mainWindow.off('move', changMsWindowPosition)
    msWindow.off('close', msClose)
  }
  msWindow.on('close', msClose)
  msWindow.webContents.on('did-navigate', (_event, url) => {
    const windowUrl = new URL(url)
    msLoginEnd(windowUrl)
  })

  const msLoginEnd = (windowUrl: URL): void => {
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
          getMinecraftProfile(tokenCode, '')
            .then((r) => event.reply('oauth:ms-out', r))
            .catch((r) => event.reply('oauth:ms-out', `error:${r}`))
      } else if (
        windowUrl.searchParams.has('error') &&
        windowUrl.searchParams.has('error_description')
      ) {
        msWindowOff()
        msWindow.close()
        event.reply('oauth:ms-out', `error:none|${windowUrl.searchParams.get('error_description')}`)
      }
    }
  }
}
const log = (s: string = ''): void => {
  if (typeof s == 'string') console.log(s)
}
const getMicrosoftToken = (code: string): Promise<Map<string, string>> => {
  log('Minecraft Token get Program Start')
  return new Promise((resolve, rejects) => {
    const tokenMap = new Map<string, string>()
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
      .then((r) => r.json())
      .then((result) => {
        const msAccessToken = result.access_token
        const msRefreshToken = result.refresh_token
        log('| accessToken - ' + msAccessToken)
        log('| refreshToken - ' + msRefreshToken)
        log('- get microsoft assess token done')
        log()

        tokenMap.set('access_token', msAccessToken)
        tokenMap.set('refresh_token', msRefreshToken)
        resolve(tokenMap)
      })
      .catch(() => rejects('Microsoft Token Error'))
  })
}

const getMinecraftProfile = (code: string = '', refreshToken: string = ''): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (code != '') {
      getMicrosoftToken(code)
        .then((r) =>
          mainDef(r)
            .then((r) => resolve(r))
            .catch((e) => reject(e))
        )
        .catch((e) => reject(e))
    } else if (refreshToken != '') {
      getMicrosoftToken(code)
        .then((r) =>
          mainDef(r)
            .then((r) => resolve(r))
            .catch((e) => reject(e))
        )
        .catch((e) => reject(e))
    }

    const mainDef = (msToken: Map<string, string>): Promise<any> => {
      return new Promise((resolve, reject) => {
        getMinecraftToken(`${msToken.get('access_token')}`)
          .then((result) => {
            // axios
            //   .get('https://api.minecraftservices.com/entitlements/mcstore', {
            //     headers: {
            //       Authorization: `Bearer ${result.access_token}`
            //     }
            //   })
            //   .then(() => {
            resolve({
              microsoftRefreshToken: msToken.get('refresh_token'),
              minecraftMeta: {
                tokenMeta: result
              }
            })
            // })
            // .catch(() => reject('i18n|error.msAccount.minecraft.notOwned'))
          })
          .catch((err) => reject(err))
      })
    }
  })
}

const getMinecraftToken = (msAccessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const headersGetXboxToken = new Headers()
    headersGetXboxToken.append('Content-Type', 'application/json')
    headersGetXboxToken.append('Accept', 'application/json')
    headersGetXboxToken.append('User-Agent', `KoiLauncher/${process.env.npm_package_version}`)
    log('- get xbox token start from MS Assess TOKEN')
    fetch('https://user.auth.xboxlive.com/user/authenticate', {
      method: 'POST',
      headers: headersGetXboxToken,
      redirect: 'follow',
      body: JSON.stringify({
        Properties: {
          AuthMethod: 'RPS',
          SiteName: 'user.auth.xboxlive.com',
          RpsTicket: `${msAccessToken}` // 第二步中获取的访问令牌
        },
        RelyingParty: 'http://auth.xboxlive.com',
        TokenType: 'JWT'
      })
    })
      .then((r) => r.json())
      .then((result) => {
        if (result.Token == null) reject('i18n|error.msAccount.xbox.unregistered')
        const xboxToken = result.Token
        const xboxUserHash = result.DisplayClaims.xui[0].uhs
        log('| xboxToken - ' + xboxToken)
        log('| xboxUserHash - ' + xboxUserHash)
        log('- get xbox token token done')
        log()

        log('- get xsts token start from xbox token')
        fetch('https://xsts.auth.xboxlive.com/xsts/authorize', {
          method: 'POST',
          headers: headersGetXboxToken,
          redirect: 'follow',
          body: JSON.stringify({
            Properties: {
              SandboxId: 'RETAIL',
              UserTokens: [
                xboxToken // 上面得到的XBL令牌
              ]
            },
            RelyingParty: 'rp://api.minecraftservices.com/',
            TokenType: 'JWT'
          })
        })
          .then((r) => r.json())
          .then((result) => {
            if (result.Token == null) reject('i18n|error.msAccount.xbox.unregistered')
            const xstsToken = result.Token
            const xstsUserHash = result.DisplayClaims.xui[0].uhs
            log('| xstsToken - ' + xstsToken)
            log('| xstsUserHash - ' + xstsUserHash)
            log('- get xsts token token done')
            log()

            const xblAccessToken = `XBL3.0 x=${xstsUserHash};${xstsToken}`
            log(`- get minecraft assess token start from xsts token`)
            fetch('https://api.minecraftservices.com/authentication/login_with_xbox', {
              method: 'POST',
              headers: headersGetXboxToken,
              redirect: 'follow',
              body: JSON.stringify({
                identityToken: xblAccessToken
              })
            })
              .then((r) => r.json())
              .then((result) => {
                if (result.access_token == null) reject('i18n|error.msAccount.minecraft.notOwned')
                const accessToken = result.access_token
                log('| accessToken - ' + accessToken)
                log('- All Down, Back Token')
                log()
                resolve(result)
              })
              .catch(() => reject('i18n|error.msAccount.minecraft.notOwned'))
          })
          .catch(() => reject('i18n|error.msAccount.xbox.unregistered'))
      })
      .catch(() => reject('i18n|error.msAccount.xbox.unregistered'))
  })
}
export default microsoftLogin
