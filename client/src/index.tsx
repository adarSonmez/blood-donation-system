import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { UserProvider } from './contexts/user.context'
import { DrawerProvider } from './contexts/drawer.context'
import { ThemeModeProvider } from './contexts/themeMode.context'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <UserProvider>
          <DrawerProvider>
            <App />
          </DrawerProvider>
        </UserProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
