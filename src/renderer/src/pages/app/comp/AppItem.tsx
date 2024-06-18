import { ReactNode } from 'react'

const AppItem = ({
  title,
  margin = true,
  children
}: {
  title?: string | ReactNode
  margin?: boolean
  children?: ReactNode
}) => {
  return (
    <div>
      <div className={`mt-10 ml-9 text-[0.8rem] font-semibold mb-1`}>{title}</div>
      <div className={`w-full text-sm ${margin && `ml-9`}`}>{children}</div>
    </div>
  )
}
export default AppItem
