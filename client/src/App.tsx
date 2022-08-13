import { CssBaseline, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import DrawerContainer from './components/drawer-container/DrawerContainer'
import Header from './components/header/Header'
import { DrawerContext } from './contexts/drawer.context'

function App() {
  const {
    state: { width },
  } = useContext(DrawerContext)

  return (
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
  )
}

export default App
