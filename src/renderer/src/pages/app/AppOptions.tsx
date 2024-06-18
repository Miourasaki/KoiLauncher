import { FlexAppHeader } from "./comp/AppHeader";
import AppRoute from './comp/AppRoute'
import Launcher from './AppOptions/Launcher'
import Account from './AppOptions/Account'
import { useTranslation } from "react-i18next";

const AppOptions = () => {
  const {t} = useTranslation()

  const headerList = [
    {
      text: t('meta.option.game.title'),
      to: 'game'
    },
    {
      text: t('meta.option.account.title'),
      to: 'account'
    },
    {
      text: t('meta.option.launcher.title'),
      to: 'launcher'
    },
    {
      text: t('meta.option.about.title'),
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      to: () => window.electron.ipcRenderer.send('window:openAbout')
    }
  ]

  return (
    <>
      <FlexAppHeader title={t('meta.option.title')} list={headerList}>
        <AppRoute path={'game'}></AppRoute>
        <AppRoute path={'account'}>
          <Account />
        </AppRoute>
        <AppRoute path={'launcher'}>
          <Launcher />
        </AppRoute>
      </FlexAppHeader>
    </>
  )
}

export default AppOptions
