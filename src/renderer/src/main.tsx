import './assets/main.css'
import 'tailwindcss/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './App'
import {HashRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Index />
    </HashRouter>
  </React.StrictMode>
)
