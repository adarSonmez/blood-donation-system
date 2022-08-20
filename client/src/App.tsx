import { useEffect, useContext, useMemo } from 'react'

import { decode } from './api/users.api'
import { UserContext } from './contexts/user.context'
import { DrawerContext } from './contexts/drawer.context'
import { ThemeModeContext } from './contexts/themeMode.context'

import { CssBaseline, ThemeProvider, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { mainTheme } from './assets/themes/main.theme'

import DrawerContainer from './components/drawer-container/DrawerContainer'
import Header from './components/header/Header'
import Main from './components/main/Main'

function App() {
  const mode = useContext(ThemeModeContext).theme.mode
  const width = useContext(DrawerContext).state.width
  const { setCurrentUser } = useContext(UserContext)

  useEffect(() => {
    decode({ token: localStorage.getItem('x-access-token') })
      .then((r) => {
        if (r.data.user) {
          setCurrentUser(r.data.user)
        }
      })
      .catch((err) => console.error(err.message))
  }, [])

  const theme = useMemo(() => mainTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <DrawerContainer />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            width: { sm: `calc(100% - ${width}px)` },
          }}
        >
          <Toolbar />
          <Main />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
