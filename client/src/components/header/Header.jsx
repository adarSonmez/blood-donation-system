import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useContext } from 'react'
import { DrawerContext } from '../../contexts/drawer.context'

function Header() {
  const {
    state: { width },
    toggleDrawer,
  } = useContext(DrawerContext)

  return (
    <AppBar
      position="fixed"
      color="error"
      sx={{
        width: { sm: `calc(100% - ${width}px)` },
        ml: { sm: `${width}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Blood Donation System
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
