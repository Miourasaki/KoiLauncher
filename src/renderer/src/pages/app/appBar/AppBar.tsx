import { createContext } from 'react'
import BarAccountComp from './BarAccountComp'
import BarConfigureComp from './BarConfigureComp'
import BarBottomComp from './BarBottomComp'
import BarLink from "./BarLink";

export const AppBarContext = createContext<any>(null)

const AppBar = (): JSX.Element => {
  return (
    <div
      className={`min-w-52 max-w-52 h-full bg-[#1e1e1e] text-white flex flex-col justify-between overflow-hidden border-r border-stone-900`}
    >
      <div className={`w-full h-full flex-grow flex flex-col`}>
        <BarAccountComp />
        <BarConfigureComp />
        <div className={`h-[calc(100vh-56.15rem)] flex-grow w-full shadow-inner shadow-stone-950 overflow-y-auto`}>

          <BarLink to={`/app/versions`}>版本列表</BarLink>
          <BarLink to={`/app/downloads`}>下载</BarLink>
          <BarLink to={`/app/frp`}>内网映射</BarLink>
          <BarLink to={`/app/configure/cid/options`} hash={`main`}>配置</BarLink>

        </div>
      </div>
      <BarBottomComp />
    </div>
  )
}

export default AppBar
