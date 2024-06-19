import './assets/main.css'
import 'tailwindcss/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './App'
import './components/i18n'
import { HashRouter } from 'react-router-dom'

document.addEventListener('keydown', (e) => {
  if (e.key === 'F11') {
    e.preventDefault() // 尝试阻止默认行为，但可能不起作用
  }
})
window.electron.ipcRenderer.on('window:alter', (_, msg) => {
  alert(msg)
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Index />
    </HashRouter>
  </React.StrictMode>
)
