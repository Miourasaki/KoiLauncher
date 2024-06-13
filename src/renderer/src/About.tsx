import './assets/main.css'
import 'tailwindcss/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import About from './pages/About'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <About />
    </HashRouter>
  </React.StrictMode>
)
