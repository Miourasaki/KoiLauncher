import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import AppIndex from './pages/app/AppIndex'
import { useEffect } from 'react'
import About from './pages/About'
import License from './pages/License'
import NotificationContext from './components/notify/NotificationContext'
import MainContextProvider from './components/CoreContext'

function App(): JSX.Element {
  useEffect(() => {
    // @ts-ignore
    // window.api.onDeeplinkPush((_event,args) => console.log(args))
  }, [])

  return (
    <NotificationContext>
      <MainContextProvider>
        <Routes>
          <Route path={'/app/*'} element={<AppIndex />} />
          <Route path={'/*'} element={<Index />} />
          <Route path={'/about'} element={<About />} />
          <Route path={'/license'} element={<License />} />
        </Routes>
      </MainContextProvider>
    </NotificationContext>
  )
}

export default App
