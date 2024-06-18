import { FlexAppHeader } from "./comp/AppHeader";
import AppRoute from './comp/AppRoute'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Skin from "./AppAccount/Skin";
import Loading from "../../components/Loading";
import { useContext, useEffect, useState } from "react";
import AppButton from "./comp/AppButton";
import { Decrypt } from "../../components/AES";
import { MainContext } from "../../components/CoreContext";

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
  const { setAccountMetaDef } = useContext(MainContext)

  const getMeta = true
  const [load, setLoad] = useState(getMeta)
  const [error, setError] = useState('')

  // @ts-ignore
  let msAccountMeta = mainStorage.getItem('account.microsoftAccount.' + id)

  useEffect(() => {
    window.electron.ipcRenderer.on('auth:ms-out', (_event, msg) => {
      if (typeof msg === 'string') {
        const args = msg.split(':')
        if (args[0] == 'error') {
          console.log(msg);
          const textArgs = args[1].split('|')
          if (textArgs.length > 1) {
            if (textArgs[0] == 'i18n') {
              setError(t(textArgs[1]))
            }
          } else {
            setError(`${t('error.prefix')}: ${args[1]}`)
          }
        }
      } else {
        setAccountMetaDef(msg, false)
        // @ts-ignore
        msAccountMeta = mainStorage.getItem('account.microsoftAccount.' + id)
        setLoad(false)
        setError('')
      }
    })

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('auth:ms-out')
    }
  }, [])

  useEffect(()=>{
    if (getMeta) pushToken()
  },[])

  const pushToken = () => {
    setError('')
    window.electron.ipcRenderer.send('auth:ms-in', [Decrypt(msAccountMeta.refreshToken), Decrypt(msAccountMeta.accessToken)])
  }


  return (<>
      <FlexAppHeader
        title={`${t('meta.account.type.microsoft')} | ${msAccountMeta.minecraftMeta.name}`}
        list={headerList}
      >

        <AppRoute path={'main'}>
          {JSON.stringify(msAccountMeta)}
        </AppRoute>
        <AppRoute path={"skin"} children={<Skin msAccountMeta={msAccountMeta} />} />
        <AppRoute path={"realm"}>
          <div className={`w-full h-[calc(100%-5rem)] flex items-center justify-center font-bold`}>{t("meta.building")}</div>
        </AppRoute>

        {load &&
          <div className={`absolute w-full h-full top-0 left-0 bg-[#333333]`}>
            <div className={`px-9 py-10`}>
              <div className={`flex`}>
                <div className={"screen-root-item w-24 h-20 mb-1.5 mr-4"}></div>
                <div className={`w-full flex-grow`}>
                  <div className={"screen-root-item w-full h-5 mb-1.5 mt-1"}></div>
                  <div className={"screen-root-item w-full h-5 mb-1.5"}></div>
                  <div className={"screen-root-item w-2/3 h-5 mb-1.5"}></div>
                </div>
              </div>
              <div className={"screen-root-item w-full h-5 mb-1.5 mt-6"}></div>
              <div className={"screen-root-item w-full h-5 mb-1.5"}></div>
              <div className={"screen-root-item w-full h-5 mb-1.5"}></div>
              <div className={"screen-root-item w-7/12 h-5 mb-1.5"}></div>
              <div className={"screen-root-item w-full h-5 mb-1.5 mt-6"}></div>
              <div className={"screen-root-item w-full h-5 mb-1.5"}></div>
              <div className={"screen-root-item w-full h-5 mb-1.5"}></div>
              <div className={"screen-root-item w-9/12 h-5 mb-1.5"}></div>


            </div>

            <div
              className={`absolute top-0 left-0 w-full h-full bg-stone-800 bg-opacity-90 backdrop-blur-sm flex items-center justify-center`}>

              <div className={`mb-6 flex flex-col items-center`}>

                {error != '' ?
                  <>
                    <div className={`uppercase font-semibold`}>Error</div>
                    <div className={`text-sm`}> {error == '' ?
                      '无法获取Microsoft账户信息'
                      :
                      error}</div>
                    <AppButton
                      onClick={() => {
                        pushToken()
                      }}
                      changColor={true}
                      className={`px-3 w-auto h-auto py-1 bg-[#d98b9b] hover:bg-[#8c5964] border-0 mt-3`}
                    >
                      重试
                    </AppButton>
                  </>
                  :
                  <Loading border={false} />
                }
              </div>

            </div>
          </div>
        }
      </FlexAppHeader>
        </>)
}

export default AppOptions
