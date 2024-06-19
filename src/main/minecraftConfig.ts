import axios from "axios";
import { getMicrosoftTokenWithRefreshToken, getMinecraftToken } from "./microsoftLogin";


export const getMinecraftConfig = (
  event: Electron.IpcMainEvent,
  args: any
): void => {
  mainFunc(args)
    .then((r) => event.reply('config:ms-out', r))
    .catch((r) => event.reply('config:ms-out', `error:${r}`))
}

const mainFunc = (args: string[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {

    const mainDef = (msToken: Map<string, string>): Promise<any> => {
      return new Promise((resolve, reject) => {
        getMinecraftToken(`${msToken.get('access_token')}`)
          .then((result) => {
            getMain(result.access_token)
              .then((r) =>
                resolve({
                  microsoftMeta: {
                    accessToken: msToken.get('access_token'),
                    refreshToken: msToken.get('refresh_token')
                  },
                  minecraftMeta: {
                    minecraftToken: result.access_token,
                    minecraftAccessMeta: r
                  }
                })
              )
              .catch((e) => reject(e))
          })
          .catch((err) => reject(err))
      })
    }

    getMain(args[1])
      .then((r) => resolve({
        microsoftMeta: {
          refreshToken: args[0]
        },
        minecraftMeta: {
          minecraftToken: args[1],
          minecraftAccessMeta: r
        }
      }))
      .catch(() => {
        getMicrosoftTokenWithRefreshToken(args[0])
          .then((r) =>
            mainDef(r)
              .then((r) => resolve(r))
              .catch((e) => reject(e))
          )
          .catch((e) => reject(e))
      })
  })



}

const getMain = (mcAccessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // axios.defaults.timeout = 10000
    const axiosHeader = {
      Authorization: `Bearer ${mcAccessToken}`,
      'User-Agent': `KoiLauncher/${process.env.npm_package_version}`
    }
    axios
      .get('https://api.minecraftservices.com/entitlements/mcstore', {
        headers: axiosHeader
      })
      .then((r) => {
        const data = r.data
        let profileData: any
        let attributesData: any
        let blocklistData: any

        if (r.data.items.length <= 0) reject('i18n|error.msAccount.minecraft.notOwned')
        axios
          .get('https://api.minecraftservices.com/minecraft/profile', {
            headers: axiosHeader
          })
          .then((r) =>
            profileData = r.data
          )
          .catch(() => reject('i18n|error.msAccount.mojang.failure'))
        axios
          .get('https://api.minecraftservices.com/player/attributes', {
            headers: axiosHeader
          })
          .then((r) =>
            attributesData = r.data
          )
          .catch(() => reject('i18n|error.msAccount.mojang.failure'))
        axios
          .get('https://api.minecraftservices.com/privacy/blocklist', {
            headers: axiosHeader
          })
          .then((r) =>
            blocklistData = r.data
          )
          .catch(() => reject('i18n|error.msAccount.mojang.failure'))

        resolve({
          mcstoreMeta: data,
          profileMeta: profileData,
          attributesData: attributesData,
          blocklistData: blocklistData
        })

      })
      .catch(() => reject('i18n|error.msAccount.mojang.failure'))
  })
}
