import { useContext, useEffect, useState } from 'react'
import { NotificationContextCore } from '../../../components/notify/NotificationContext'
import { Card } from '../../../components/notify/Notification'
import defaultAvatar from '../../../assets/img/logo-koishi-100-export.png'
import { useTranslation } from 'react-i18next'

const AppBar = (): JSX.Element => {
  const { createNotification } = useContext(NotificationContextCore)
  const { t } = useTranslation()

  useEffect(() => {
    createNotification(Card.error, '未登录')
  }, [])

  const [accountMenu, setAccountMenu] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [accountType, setAccountType] = useState('')

  useEffect(() => {
    const baseAccountMeta = sessionStorage.getItem('accountMeta')
    if (baseAccountMeta != null) {
      const msAccountMeta: any = JSON.parse(atob(baseAccountMeta))
      setAccountName(msAccountMeta.accountProfile.name)
      setAccountType(msAccountMeta.accountType)
    }
  }, [])

  return (
    <div className={`min-w-52 h-full bg-[#1e1e1e] text-white  `}>
      <button
        onClick={() => setAccountMenu(!accountMenu)}
        className={`group mt-2 w-full h-14 transition-all hover:bg-white hover:bg-opacity-20 flex justify-between items-center px-3.5`}
      >
        <div className={`flex items-center`}>
          <img src={defaultAvatar} alt="" className={`w-8 rounded-full`} />
          <div className={`ml-2 leading-5 flex flex-col items-start`}>
            <div className={`text-[0.9rem]`}>
              {accountName == '' ? (
                <div className={'screen-root-item w-24 h-4 mb-1'}></div>
              ) : (
                accountName
              )}
            </div>
            <div className={`text-xs text-stone-400`}>
              {accountType == '' ? <div className={'screen-root-item w-16 h-3'}></div> : t(`meta.account.type.${accountType}`)}
            </div>
          </div>
        </div>
        <div
          className={`mb-3 group-hover:mb-2 transition-all ${accountMenu && 'rotate3d-account'}`}
        >
          <svg className={`w-6`} viewBox="0 0 24 24">
            <path
              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  )
}

export default AppBar
