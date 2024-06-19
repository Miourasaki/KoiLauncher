import { createContext, ReactNode, useState } from 'react'
import { Encrypt } from './AES'

export const MainContext = createContext<any>(null)

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [accountMeta, setAccountMeta] = useState<any>(null)

  const setAccountMetaDef = (msg: any, save: boolean = true): void => {
    const result: any = {
      accountType: 'microsoft',
      accountProfile: msg.minecraftMeta.minecraftAccessMeta.profileMeta,
      accessToken: msg.minecraftMeta.minecraftToken,
      microsoftAccess: {
        mcstoreMeta: msg.minecraftMeta.minecraftAccessMeta.mcstoreMeta
      }
    }

    setAccountMeta(result)
    sessionStorage.setItem('accountMeta', btoa(JSON.stringify(result)))
    const uuid = msg.minecraftMeta.minecraftAccessMeta.profileMeta.id


    const ownedList = []
    // @ts-ignore
    msg.minecraftMeta.minecraftAccessMeta.mcstoreMeta.items.map((item: any) => ownedList.push(item.name))

    const localData = {
      refreshToken: Encrypt(msg.microsoftMeta.refreshToken),
      accessToken: Encrypt(msg.minecraftMeta.minecraftToken),
      minecraftMeta: {
        id: uuid,
        name: msg.minecraftMeta.minecraftAccessMeta.profileMeta.name,
        // skin: mcSkin,
        // cape: mcCape,
        // capes: mcCapes,
      },
      ownedList: ownedList
    }
    // const base64LocalData = btoa(JSON.stringify(localData))
    const key = `account.microsoftAccount.${uuid}`

    // @ts-ignore
    if (mainStorage.getItem(key) == null) mainStorage.setItem(key, localData)
    else {
      // @ts-ignore
      const msAccountData: any = mainStorage.getItem(key)
      if (msAccountData.minecraftMeta.id === localData.minecraftMeta.id) {
        // @ts-ignore
        mainStorage.setItem(key, localData)
      }
    }
    // @ts-ignore
    if (save) mainStorage.setItem(`account.masterType`, 'online:' + uuid)
    // const msAccountList = localStorage.getItem('msAccount.list')
    // if (msAccountList == null) localStorage.setItem('msAccount.list', JSON.stringify([uuid]))
    // else
    //   localStorage.setItem('msAccount.list', JSON.stringify(JSON.parse(msAccountList).append(uuid)))
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
