import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import App from './App'

import { UserProvider } from './contexts/user.context'
import { DrawerProvider } from './contexts/drawer.context'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <DrawerProvider>
          <App />
        </DrawerProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
