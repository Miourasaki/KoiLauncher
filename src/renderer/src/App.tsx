import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import AppIndex from "./pages/app/AppIndex";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path={'/app/*'} element={<AppIndex />} />
        <Route path={'/*'} element={<Index />} />
      </Routes>
    </>
  )
}

export default App
