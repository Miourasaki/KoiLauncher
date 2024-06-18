import { ReactNode } from 'react'

const AppButton = ({
  onClick,
  disabled,
  className,
  changColor,
  children
}: {
  onClick?: () => void
  disabled?: boolean
  className?: string
  changColor?: boolean
  children?: ReactNode
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${!changColor && 'hover:bg-white hover:bg-opacity-25'} text-[0.8rem] w-8 h-8 border border-[#7d7d7d] transition-all flex items-center justify-center`}
    >
      {children}
    </button>
  )
}
export default AppButton
