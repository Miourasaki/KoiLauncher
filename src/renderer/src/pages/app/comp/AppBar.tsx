import { createContext, useContext, useEffect, useState } from 'react'
import { NotificationContextCore } from '../../../components/notify/NotificationContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BarAccountComp from './BarAccountComp'

export const AppBarContext = createContext<any>(null)

const AppBar = (): JSX.Element => {
  const { createNotification } = useContext(NotificationContextCore)
  const { t } = useTranslation()
  const push = useNavigate()

  useEffect(() => {}, [])

  const [accountMenu, setAccountMenu] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [accountType, setAccountType] = useState('')

  useEffect(() => {
    const baseAccountMeta = sessionStorage.getItem('accountMeta')
    if (baseAccountMeta != null) {
      const accountMeta: any = JSON.parse(atob(baseAccountMeta))
      if (accountMeta.accountType == 'offline') {
        setAccountName(accountMeta.accountProfile.name)
        setAccountType(accountMeta.accountType)
      } else {
        setAccountName(accountMeta.accountProfile.name)
        setAccountType(accountMeta.accountType)
      }
    } else push('/')
  }, [])

  return (
    <AppBarContext.Provider
      value={{
        accountMenu,
        setAccountMenu,
        accountName,
        setAccountName,
        accountType,
        setAccountType
      }}
    >
      <div className={`min-w-52 h-full bg-[#1e1e1e] text-white  `}>
        <BarAccountComp />
      </div>
    </AppBarContext.Provider>
  )
}

export default AppBar
