import './Login.css'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import { useContext, useEffect, useState } from 'react'
import { NotificationContextCore } from '../../components/notify/NotificationContext'
import { Card } from '../../components/notify/Notification'
import { useTranslation } from 'react-i18next'
import { MainContext } from '../../components/CoreContext'

const Login = (): JSX.Element => {
  document.title = 'Koi Launcher | Login'

  const push = useNavigate()
  const { t } = useTranslation()
  const { setAccountMetaDef } = useContext(MainContext)
  const { createNotification } = useContext(NotificationContextCore)
  const [login, setLoginMain] = useState(false)
  const [loginClass, setLoginClass] = useState(false)
  const loginMs = (): void => {
    setLogin(true)
    window.electron.ipcRenderer.send('oauth:ms-in')
  }
  const setLogin = (b: boolean): void => {
    if (b) {
      setLoginMain(b)
      setLoginClass(b)
    } else {
      setLoginClass(b)
      setTimeout(() => setLoginMain(b), 200)
    }
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('oauth:ms-out', (_event, msg) => {
      let closeTime = 0
      if (typeof msg === 'string') {
        const args = msg.split(':')
        if (args[0] == 'error') {
          const textArgs = args[1].split('|')
          if (textArgs.length > 1) {
            if (textArgs[0] == 'i18n') {
              createNotification(Card.error, t(textArgs[1]))
            } else if (textArgs[0] == 'none') {
              closeTime = Math.random() * 600 + 400
            }
          } else {
            createNotification(Card.error, `${t('error.prefix')}: ${args[1]}`)
          }
        }
      } else {
        setAccountMetaDef(msg)
        push('/app')
      }
      setTimeout(() => {
        setLogin(false)
      }, closeTime)
    })

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('oauth:ms-out')
    }
  }, [])

  const other = t('login.other').split('\t')

  const isLogin = sessionStorage.getItem('accountMeta') != null

  return (
    <>
      <div
        className={`px-24 items-center justify-center gap-6
      flex flex-col text-white w-full`}
      >
        <div className={`font-medium text-2xl tracking-[0.2rem] uppercase`}>{t('login.title')}</div>
        <div className={`flex flex-col gap-4 w-full pb-4`}>
          <button
            disabled={login}
            onClick={loginMs}
            className={`btn w-full h-10 btn-outline-sakura sakura tracking-wide flex px-20 items-center justify-between`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-microsoft"
              viewBox="0 0 16 16"
            >
              <path d="M7.462 0H0v7.19h7.462zM16 0H8.538v7.19H16zM7.462 8.211H0V16h7.462zm8.538 0H8.538V16H16z" />
            </svg>
            <div>{t('login.microsoft')}</div>
          </button>
          {isLogin ? (
            <button
              disabled={login}
              onClick={() => push('/')}
              className={`btn relative w-full h-10 btn-outline-sakura sakura tracking-wide flex px-20 items-center justify-between`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-arrow-left-circle mr-[0.1rem]"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
              <div>{t('login.back')}</div>
            </button>
          ) : (
            <button
              disabled={true}
              className={`btn-g relative w-full h-10 btn-outline-sakura sakura tracking-wide flex px-20 items-center justify-between`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                className={`mr-[2px]`}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z" />
              </svg>
              <div>{t('login.local')}</div>
              <span
                className={`absolute w-full h-full top-0 left-0 bg-stone-700 bg-opacity-60 flex justify-center items-center text-stone-400 backdrop-blur-[2px]`}
              >
                {t('meta.building')}
              </span>
            </button>
          )}
        </div>
        <button
          disabled={login}
          onClick={() => {
            // @ts-ignore
            mainStorage.setItem('account.masterType', 'offline')
            push('/')
          }}
          className={`btn w-full h-10`}
        >
          {other[0]} <span className={`text-stone-400`}>{other[1]}</span> {`${other[2]} `}
          <span className={`text-stone-400`}>{other[3]}</span>
        </button>
      </div>

      {login && (
        <span
          className={`w-full h-full absolute top-0 z-0 left-0 bg-stone-800 bg-opacity-75 backdrop-blur-sm
        flex justify-center items-center ${loginClass ? 'loginFrom' : 'loginTo'}`}
        >
          <Loading border={false} text={`...`} />
        </span>
      )}
    </>
  )
}

export default Login
