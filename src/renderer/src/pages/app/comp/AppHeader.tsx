import { useLocation, useNavigate } from 'react-router-dom'
import { ReactNode } from "react";
type ToProp = string | (() => void)

interface ButtonItem {
  to: ToProp
  text: string
}

const AppHeader = ({ title, list }: { title: string; list: ButtonItem[];  }): JSX.Element => {
  return (
      <div className="w-full min-h-[5.5rem] bg-[#1e1e1e] px-[0.66rem] flex flex-col items-start justify-end">
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

export const FlexAppHeader = ({title, list, children}: { title: string; list: ButtonItem[]; children: ReactNode}) => {
  return (
    <div className={`w-full h-full flex flex-col`}>
      <AppHeader title={title} list={list} />

      <div className={`w-full h-full flex-grow overflow-y-auto relative`}>
        {children}
      </div>
    </div>
  )
}

const HeaderButton = ({ to, children }: { to: ToProp; children?: string }): JSX.Element => {
  const push = useNavigate();
  const location = useLocation();
  const classBool = (): boolean => {
    if (typeof to === "string") return location.hash.split("#")[1] == to;
    else return false;
  };

  return (
    <button
      onClick={() => {
        if (typeof to === "string") push("#" + to);
        else to();
      }}
      className={`px-3.5 pb-2 py-1 relative transition-all duration-100 ${classBool() && "font-medium text-white"}
    text-stone-400 hover:text-white focus-visible:font-medium focus-visible:text-white focus-visible:outline-0 flex items-center`}
    >
      {children}{typeof to !== 'string' &&
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
           className="ml-1" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
        <path fill-rule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
      </svg>}
      <span
        className={`absolute h-[0.2rem] bg-[#c88f9b] bottom-0 left-1/2 -translate-x-1/2 transition-all duration-100
        ${classBool() ? 'w-5' : 'w-0'}`}
      ></span>
    </button>
  )
}

export default AppHeader
