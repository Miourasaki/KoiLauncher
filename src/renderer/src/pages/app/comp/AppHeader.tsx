import { useLocation, useNavigate } from 'react-router-dom'
type ToProp = string | (() => void)

interface ButtonItem {
  to: ToProp
  text: string
}

const AppHeader = ({ title, list }: { title: string; list: ButtonItem[] }): JSX.Element => {
  return (
    <div className="w-full h-20 bg-[#1e1e1e] px-[0.66rem] flex flex-col items-start justify-end">
      <div className={`text-[0.8rem] font-semibold ml-3.5`}>{title}</div>
      <div className={`flex`}>
        {list.map((i, index) => (
          <HeaderButton to={i.to} key={index}>
            {i.text}
          </HeaderButton>
        ))}
      </div>
    </div>
  )
}

const HeaderButton = ({ to, children }: { to: ToProp; children?: string }): JSX.Element => {
  const push = useNavigate()
  const location = useLocation()
  const classBool = (): boolean => {
    if (typeof to === 'string') return location.hash.split('#')[1] == to
    else return false
  }

  return (
    <button
      onClick={() => {
        if (typeof to === 'string') push('#' + to)
        else to()
      }}
      className={`px-3.5 pb-2 py-0.5 relative transition-all duration-100 ${classBool() && 'font-medium text-white'}
    text-stone-400 hover:text-white focus-visible:font-medium focus-visible:text-white focus-visible:outline-0`}
    >
      {children}
      <span
        className={`absolute h-[0.2rem] bg-[#c88f9b] bottom-0 left-1/2 -translate-x-1/2 transition-all duration-100
        ${classBool() ? 'w-5' : 'w-0'}`}
      ></span>
    </button>
  )
}

export default AppHeader
