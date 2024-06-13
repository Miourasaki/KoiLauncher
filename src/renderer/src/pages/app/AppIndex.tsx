import { useLocation } from 'react-router-dom'

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

  return <div className={`drag`}>a</div>
}

export default AppIndexPage
