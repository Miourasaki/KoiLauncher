import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import MainHeader from '../../components/mainHeader'
import AppBar from './comp/AppBar'

const AppIndexPage = () => {
  const backWidth = window.localStorage.getItem('backWidth')
  const backHeight = window.localStorage.getItem('backHeight')
  window.electron.ipcRenderer.send('window:setSize', [
    Number.parseFloat(backWidth ? backWidth : '900'),
    Number.parseFloat(backHeight ? backHeight : '600')
  ])

  window.electron.ipcRenderer.send('window:openResizable')

  const location = useLocation()
  window.onresize = () => {
    if (location.pathname.split('/')[1] == 'app') {
      localStorage.setItem('backWidth', String(window.innerWidth))
      localStorage.setItem('backHeight', String(window.innerHeight))
    }
  }

  useEffect(() => {}, [])

  // const msAccountMeta: any = JSON.parse(atob('' + sessionStorage.getItem('accountMeta')))

  return (
    <>
      <MainHeader />
      <div className={`w-full h-full flex bg-[#e7c0c9] relative`}>
        <AppBar />
      </div>
      {/*<div className={`h-7`}>Header</div>*/}
      {/*<div>{msAccountMeta.accountType}</div>*/}
      {/*<div>{JSON.stringify(msAccountMeta)}</div>*/}
    </>
  )
}

export default AppIndexPage
