import SettingHead from '../../../assets/img/icons/koil-setting.svg'
import UpdateLogHead from '../../../assets/img/icons/koil-updatelog.svg'
import BarLink from './BarLink'

const BarBottomComp = (): JSX.Element => {
  return (
    <div className={`mb-5 mt-4`}>
      <BarLink to={'/app/update-logs'} img={UpdateLogHead} shadow={true}>
        有什么新内容？
      </BarLink>

      <BarLink to={'/app/options'} img={SettingHead} shadow={true}>
        启动器设置
      </BarLink>
    </div>
  )
}

export default BarBottomComp
