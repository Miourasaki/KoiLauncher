import { createContext, ReactNode, useState } from 'react'
import { Encrypt } from './AES'

export const MainContext = createContext<any>(null)

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [accountMeta, setAccountMeta] = useState<any>(null)

  const setAccountMetaDef = (msg: any): void => {
    const result: any = {
      accountType: 'microsoft',
      accountProfile: msg.minecraftMeta.minecraftAccessMeta.profileMeta,
      accessToken: msg.minecraftMeta.minecraftTokenMeta.access_token,
      microsoftAccess: {
        mcstoreMeta: msg.minecraftMeta.minecraftAccessMeta.mcstoreMeta
      }
    }

    setAccountMeta(result)
    sessionStorage.setItem('accountMeta', btoa(JSON.stringify(result)))
    const uuid = msg.minecraftMeta.minecraftAccessMeta.profileMeta.id
    const mcSkins: any[] = msg.minecraftMeta.minecraftAccessMeta.profileMeta.skins
    let mcSkin: string | null = null
    let index = 0
    while (index < mcSkins.length) {
      if (mcSkins[index]['state'] == 'ACTIVE') mcSkin = mcSkins[index]['url']
      index++
    }

    const localData = {
      microsoftRefreshToken: Encrypt(msg.microsoftMeta.refreshToken),
      minecraftMeta: {
        id: uuid,
        name: msg.minecraftMeta.minecraftAccessMeta.profileMeta.name,
        skin: mcSkin
      }
    }
    const base64LocalData = btoa(JSON.stringify(localData))
    const key = `msAccount.id-${uuid}.data`

    if (localStorage.getItem(key) == null) {
      localStorage.setItem(key, base64LocalData)
    } else {
      const msAccountData: any = JSON.parse(atob('' + localStorage.getItem(key)))
      if (msAccountData.minecraftMeta.id === localData.minecraftMeta.id) {
        localStorage.setItem(key, base64LocalData)
      }
    }
    localStorage.setItem(`account.tokenType`, 'online:' + uuid)
    const msAccountList = localStorage.getItem('msAccount.list')
    if (msAccountList == null) localStorage.setItem('msAccount.list', JSON.stringify([uuid]))
    else localStorage.setItem('msAccount.list', JSON.stringify(JSON.parse(msAccountList).append(uuid)))
  }

  return (
    <MainContext.Provider
      value={{
        accountMeta,
        setAccountMeta,
        setAccountMetaDef
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider
