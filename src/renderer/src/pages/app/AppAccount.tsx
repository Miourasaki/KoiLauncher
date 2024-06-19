import { FlexAppHeader } from "./comp/AppHeader";
import AppRoute from './comp/AppRoute'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Skin from "./AppAccount/Skin";
// import Loading from "../../components/Loading";
// import { useContext, useEffect, useState } from "react";
// import AppButton from "./comp/AppButton";
// import { Decrypt } from "../../components/AES";
// import { MainContext } from "../../components/CoreContext";

const AppOptions = () => {
  const { t } = useTranslation()

  const headerList = [
    {
      text: "设置",
      to: 'main'
    },
    {
      text: "皮肤",
      to: 'skin'
    },
    {
      text: "Realms",
      to: 'realm'
    },
    {
      text: "微软账户",
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      to: () => (window.open('https://account.microsoft.com/'))
    }
  ]
  const { id } = useParams()
  // const { setAccountMetaDef } = useContext(MainContext)

  // const getMeta = true
  // const [load, setLoad] = useState(getMeta)
  // const [error, setError] = useState('')

  // @ts-ignore
  let msAccountMeta = mainStorage.getItem('account.microsoftAccount.' + id)

  // useEffect(() => {
  //   window.electron.ipcRenderer.on('config:ms-out', (_event, msg) => {
  //     if (typeof msg === 'string') {
  //       const args = msg.split(':')
  //       if (args[0] == 'error') {
  //         console.log(msg);
  //         const textArgs = args[1].split('|')
  //         if (textArgs.length > 1) {
  //           if (textArgs[0] == 'i18n') {
  //             setError(t(textArgs[1]))
  //           }
  //         } else {
  //           setError(`${t('error.prefix')}: ${args[1]}`)
  //         }
  //       }
  //     } else {
  //       setAccountMetaDef(msg, false)
  //       // @ts-ignore
  //       msAccountMeta = mainStorage.getItem('account.microsoftAccount.' + id)
  //       setLoad(false)
  //       setError('')
  //     }
  //   })
  //
  //   return (): void => {
  //     window.electron.ipcRenderer.removeAllListeners('config:ms-out')
  //   }
  // }, [])
  //
  // useEffect(()=>{
  //   if (getMeta) pushToken()
  // },[])
  //
  // const pushToken = () => {
  //   setLoad(true)
  //   setError('')
  //   window.electron.ipcRenderer.send('config:ms-get', [Decrypt(msAccountMeta.refreshToken), Decrypt(msAccountMeta.accessToken)])
  // }


  return (<>
      <FlexAppHeader
        title={`${t('meta.account.type.microsoft')} | ${msAccountMeta.minecraftMeta.name}`}
        list={headerList}
      >

        <AppRoute path={'main'}>
          {JSON.stringify(msAccountMeta)}
        </AppRoute>
        <AppRoute path={"skin"} children={<Skin paramId={id} />} />
        <AppRoute path={"realm"}>
          <div className={`w-full h-[calc(100%-5rem)] flex items-center justify-center font-bold`}>{t("meta.building")}</div>
        </AppRoute>


      </FlexAppHeader>
        </>)
}

export default AppOptions
