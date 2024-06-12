import MainHeader from '../components/MainHeader'
import Loading from '../components/Loading'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './auth/Login'
import { useEffect } from 'react'
import loginBackground from '../assets/img/loginBackground.webp'

function App(): JSX.Element {
  const Index = () => {
    localStorage.setItem('backWidth', String(window.innerWidth))
    localStorage.setItem('backHeight', String(window.innerHeight))
    window.electron.ipcRenderer.send('setSize', [900, 600])
    window.electron.ipcRenderer.send('closeResizable')

    const p = useNavigate()
    const push = (path: string) => setTimeout(() => p(path), 1000)
    useEffect(() => {
      const tokenType = localStorage.getItem('tokenType')
      if (!tokenType) {
        push('/auth/login')
      }
    }, [])

    if (1 == 1) {
      return (
        <div className={`mb-12`}>
          <Loading />
        </div>
      )
    } else {
      return (
        <div
          className={`min-w-[31rem] min-h-[21rem] flex items-center justify-center mb-12`}
          style={{ background: 'rgb(35, 33, 33)' }}
        >
          <Loading border={false} />
        </div>
      )
    }
  }

  return (
    <main className={`w-full h-full relative`}>
      <MainHeader />
      <div className={`w-full h-full flex-grow flex items-center justify-center`}>
        <Routes>
          <Route index element={<Index />} />
          <Route path={'/auth/login'} element={<Login />} />
        </Routes>
      </div>
      <span
        className={`w-full h-full absolute top-0 left-0 -z-10 flex items-end justify-center pointer-events-none`}
      >
        <img src={loginBackground} alt={''} className={`w-full h-full`} />
        {/*<div className={`w-full h-full bg-white bg-opacity-10 backdrop-blur-sm`}></div>*/}
        {/*</div>*/}
      </span>
    </main>
  )
}

export default App
