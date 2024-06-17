import React from 'react'
import { useLocation } from 'react-router-dom'

const AppRoute = ({
  path,
  children
}: {
  path: string
  children?: React.ReactNode
}): JSX.Element => {
  const location = useLocation()
  if (path == location.hash.split('#')[1]) {
    return <>{children}</>
  }
  return <></>
}

export default AppRoute
