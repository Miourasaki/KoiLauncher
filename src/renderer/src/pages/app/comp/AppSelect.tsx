import { ReactNode, useEffect, useState } from 'react'

const AppSelect = ({
  selected,
  children
}: {
  selected: string
  children: ReactNode
}): JSX.Element => {
  const [selectMenu, setSelectMenu] = useState<boolean>(true)

  useEffect(() => {
    const clickEvent = (_) => {
      if (_.target.id != 'target-menu') setSelectMenu(false)
    }
    document.addEventListener('click', clickEvent)

    return () => document.removeEventListener('click', clickEvent)
  }, [])

  return (
    <div className={`relative w-80`}>
      <button
        id={`target-menu`}
        onClick={() => setSelectMenu(!selectMenu)}
        className={`w-80 h-8 bg-[#131313] hover:bg-[#0e0e0e] rounded-sm px-2.5 flex items-center justify-between group
        focus:outline-1 focus:outline`}
      >
        <div>{selected}</div>
        <div
          className={`group-hover:mt-[0.15rem] transition-all ${selectMenu && 'rotate3d-account'} pointer-events-none`}
        >
          <svg className={`w-5`} viewBox="0 0 24 24">
            <path
              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        {selectMenu && (
          <div
            className={`absolute py-1 w-full max-h-72 bg-[#131313] -bottom-1.5 rounded-sm overflow-y-auto translate-y-full transMenu left-0`}
          >
            {children}
          </div>
        )}
      </button>
    </div>
  )
}

export const AppSelectList = ({
  onSelect,
  isSelected = false,
  children
}: {
  onSelect?: () => void
  isSelected?: boolean
  children?: ReactNode
}): JSX.Element => {
  return (
    <button
      onClick={onSelect}
      className={`h-[2.15rem] w-full hover:bg-[#c88f9b] flex px-2.5 items-center ${isSelected && 'font-bold'}`}>
      {children}
    </button>
  )
}

export default AppSelect
