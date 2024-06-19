import SettingHead from '../../../assets/img/icons/koil-setting.svg'
import UpdateLogHead from '../../../assets/img/icons/koil-updatelog.svg'
import BarLink from './BarLink'
import { useTranslation } from 'react-i18next'
import { useLocation } from "react-router-dom";
// @ts-ignore
const version = __APP_VERSION__
const BarBottomComp = (): JSX.Element => {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <div className={`mt-4`}>
      <BarLink to={'/app/articles'} hash={'update-log'} img={UpdateLogHead} shadow={true}>
        {t('meta.menu.updateLog')}
      </BarLink>

      <BarLink to={'/app/options'} hash={'launcher'} img={SettingHead} shadow={true}>
        {t('meta.menu.launcherOption')}
      </BarLink>
      <div className={`h-5 w-full flex items-center justify-between text-xs px-2 text-stone-400`}>
        <div>v{version}</div>
        <div>{location.pathname}</div>
      </div>
    </div>
  )
}

export default BarBottomComp
