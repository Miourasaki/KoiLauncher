import { createContext } from 'react'
import BarAccountComp from './BarAccountComp'
import BarVersionComp from './BarVersionComp'
import BarBottomComp from './BarBottomComp'

export const AppBarContext = createContext<any>(null)

const AppBar = (): JSX.Element => {
  return (
    <div
      className={`min-w-52 max-w-52 h-full bg-[#1e1e1e] text-white flex flex-col justify-between overflow-hidden border-r border-stone-900`}
    >
      <div className={`w-full h-full flex-grow flex flex-col`}>
        <BarAccountComp />
        <BarVersionComp />
        <div className={`h-full w-full shadow-inner shadow-stone-950`}></div>
      </div>
      <BarBottomComp />
    </div>
  )
}

export default AppBar
