import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

const BarLink = ({
  to,
  hash,
  img,
  children,
  shadow = false
}: {
  to: string
  hash?: string
  img: string | undefined
  shadow?: boolean
  children: ReactNode
}): JSX.Element => {
  const location = useLocation()

  const classBool = (): boolean => {
    return location.pathname == to
  }

  const getPath = (): string => {
    if (hash) return `${to}#${hash}`
    return to
  }

  return (
    <Link
      to={getPath()}
      className={`relative w-full h-[3.7rem] border-stone-700 transition-all flex justify-between items-center px-4
      ${classBool() && shadow ? 'border-stone-700 border-y shadow-md shadow-stone-950' : 'hover:bg-white hover:bg-opacity-15'}`}
    >
      <div className={`flex items-center`}>
        <img src={img} alt="" className={`w-7`} />
        <div
          className={`ml-3.5 leading-5 flex flex-col items-start ${classBool() && 'font-medium'}`}
        >
          {children}
        </div>
      </div>
      <div></div>

      <span
        className={`bg-[#c88f9b] absolute w-1 left-0 duration-100 transition-all ${classBool() ? 'h-2/5' : 'h-0'}`}
      ></span>
    </Link>
  )
}

export default BarLink
