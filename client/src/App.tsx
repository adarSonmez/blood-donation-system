import { CssBaseline, ThemeProvider, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useMemo } from 'react'
import { mainTheme } from './assets/themes/main.theme'
import DrawerContainer from './components/drawer-container/DrawerContainer'
import Header from './components/header/Header'
import { DrawerContext } from './contexts/drawer.context'
import { Mode, ThemeModeContext } from './contexts/themeMode.context'

function App() {
  const {
    theme: { mode },
  } = useContext(ThemeModeContext)
  const {
    state: { width },
  } = useContext(DrawerContext)

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
            p: 3,
            width: { sm: `calc(100% - ${width}px)` },
          }}
        >
          <Toolbar />
          some etxt
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
