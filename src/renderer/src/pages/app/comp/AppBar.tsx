import { createContext } from 'react'
import BarAccountComp from './BarAccountComp'

export const AppBarContext = createContext<any>(null)

const AppBar = (): JSX.Element => {
  return (
    <div className={`min-w-52 h-full bg-[#1e1e1e] text-white  `}>
      <BarAccountComp />
    </div>
  )
}

export default AppBar
