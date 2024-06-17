import { useLocation, useNavigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import MainHeader from '../../components/mainHeader'
import AppBar from './comp/AppBar'
import './comp/AppIndex.css'

export const AppContext = createContext<any>(null)

const AppIndexPage = () => {
  window.electron.ipcRenderer.send('window:openResizable')
  const backWidth = window.localStorage.getItem('backWidth')
  const backHeight = window.localStorage.getItem('backHeight')
  window.electron.ipcRenderer.send('window:setSize', [
    Number.parseFloat(backWidth ? backWidth : '900'),
    Number.parseFloat(backHeight ? backHeight : '600')
  ])
  const location = useLocation()
  window.onresize = () => {
    if (location.pathname.split('/')[1] == 'app') {
      localStorage.setItem('backWidth', String(window.innerWidth))
      localStorage.setItem('backHeight', String(window.innerHeight))
    }
  }

  const push = useNavigate()

  const [accountMeta, setAccountMeta] = useState<any>(null)

  const [accountName, setAccountName] = useState('')
  const [accountType, setAccountType] = useState('')

  useEffect(() => {
    const baseAccountMeta = sessionStorage.getItem('accountMeta')
    if (baseAccountMeta != null) {
      const accountMeta: any = JSON.parse(atob(baseAccountMeta))
      setAccountMeta(accountMeta)
      if (accountMeta.accountType == 'offline') {
        setAccountName(accountMeta.accountProfile.name)
        setAccountType(accountMeta.accountType)
      } else {
        setAccountName(accountMeta.accountProfile.name)
        setAccountType(accountMeta.accountType)
      }
    } else push('/')
  }, [])

  useEffect(() => {


  }, []);
  // const msAccountMeta: any = JSON.parse(atob('' + sessionStorage.getItem('accountMeta')))

  return (
    <AppContext.Provider
      value={{
        accountName,
        setAccountName,
        accountType,
        setAccountType
      }}
    >
      <MainHeader />
      <div className={`w-full h-full flex bg-[#e7c0c9] relative`}>
        <AppBar />
        {JSON.stringify(accountMeta)}
      </div>
      {/*<div className={`h-7`}>Header</div>*/}
      {/*<div>{msAccountMeta.accountType}</div>*/}
      {/*<div>{JSON.stringify(msAccountMeta)}</div>*/}
    </AppContext.Provider>
  )
}

export default AppIndexPage
