import { ReactNode, useEffect } from "react";

const MainCard = ({
  classBool,
  onClose,
  children
}: {
  classBool: boolean
  onClose: () => void
  children?: ReactNode
}) => {

  useEffect(()=> {

    const keydownEsc = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        if (onClose) onClose()
      }
    }

    document.addEventListener('keydown', keydownEsc)

    return () => document.removeEventListener('keydown', keydownEsc)

  },[])

  return (
    <div
      onClick={onClose}
      className={`loginFrom ${!classBool && 'loginTo'} flex justify-center items-center
    w-full h-full absolute top-0 left-0 bg-stone-800 bg-opacity-75 backdrop-blur-sm z-30`}
    >
      <div
        onClick={(_) => {
          _.stopPropagation()
        }}
        className={`min-w-[32rem] w-[32rem] min-h-[21rem] h-[21rem] flex items-center justify-center overflow-hidden text-white`}
        style={{ background: 'rgb(33, 33, 33)' }}
      >
        {children}
      </div>
    </div>
  )
}

export default MainCard
