import AppHeader from './comp/AppHeader'
import AppRoute from './comp/AppRoute'
import Launcher from './AppOptions/Launcher'
import Account from "./AppOptions/Account";

const AppOptions = () => {
  const headerList = [
    {
      text: '通用',
      to: 'main'
    },
    {
      text: '账户',
      to: 'account'
    },
    {
      text: '启动器',
      to: 'launcher'
    },
    {
      text: '关于',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      to: () => window.electron.ipcRenderer.send('window:openAbout')
    }
  ]

  return (
    <>
      <AppHeader title={`首选项`} list={headerList} />

      <AppRoute path={'main'}></AppRoute>
      <AppRoute path={'account'}>
        <Account />
      </AppRoute>
      <AppRoute path={'launcher'}>
        <Launcher />
      </AppRoute>
    </>
  )
}

export default AppOptions
