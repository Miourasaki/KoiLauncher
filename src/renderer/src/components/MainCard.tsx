import { ReactNode, useEffect, useState } from "react";

const MainCard = ({
  open,
  onClose,
  children
}: {
  open: boolean
  onClose: () => void
  children?: ReactNode
}) => {
  const [classBool, setClassBool] = useState(true)

  useEffect(() => {
    if (open) setClassBool(true)
    else setTimeout(() => setClassBool(false), 200)

  }, [open]);

  useEffect(()=> {

    const keydownEsc = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        if (onClose) onClose()
      }
    }

    document.addEventListener('keydown', keydownEsc)

    return () => document.removeEventListener('keydown', keydownEsc)

  },[])

  if (open)
    return (
      <div
        onClick={onClose}
        className={`${classBool ? 'loginFrom' : 'loginTo'} flex justify-center items-center
      w-full h-full fixed -bottom-7 left-0 bg-stone-800 bg-opacity-75 backdrop-blur-sm z-30`}
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

  return <></>
}

export default MainCard
