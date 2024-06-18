import SettingHead from '../../../assets/img/icons/koil-setting.svg'
import UpdateLogHead from '../../../assets/img/icons/koil-updatelog.svg'
import BarLink from './BarLink'
import { useTranslation } from 'react-i18next'

const BarBottomComp = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className={`mb-5 mt-4`}>
      <BarLink to={'/app/articles'} hash={'update-log'} img={UpdateLogHead} shadow={true}>
        {t('meta.menu.updateLog')}
      </BarLink>

      <BarLink to={'/app/options'} hash={'launcher'} img={SettingHead} shadow={true}>
        {t('meta.menu.launcherOption')}
      </BarLink>
    </div>
  )
}

export default BarBottomComp
