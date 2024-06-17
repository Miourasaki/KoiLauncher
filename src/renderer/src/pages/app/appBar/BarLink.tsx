import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

const BarLink = ({
  to,
  img,
  children,
  shadow = false
}: {
  to: string
  img: string | undefined
  shadow?: boolean
  children: ReactNode
}): JSX.Element => {
  const location = useLocation()

  return (
    <Link
      to={to}
      className={`relative w-full h-14 border-stone-700 transition-all flex justify-between items-center px-3.5 hover:bg-white hover:bg-opacity-15
      ${location.pathname == to && shadow && 'border-stone-700 border-y shadow-md shadow-stone-950'}`}
    >
      <div className={`flex items-center`}>
        <img src={img} alt="" className={`w-7`} />
        <div
          className={`ml-3.5 leading-5 flex flex-col items-start ${location.pathname == to && 'font-medium'}`}
        >
          {children}
        </div>
      </div>
      <div></div>

      <span
        className={`bg-white absolute w-[0.2rem] left-0 duration-100 transition-all ${location.pathname == to ? 'h-2/5' : 'h-0'}`}
      ></span>
    </Link>
  )
}

export default BarLink
