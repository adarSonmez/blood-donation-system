import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useContext } from 'react'
import { DrawerContext } from '../../contexts/drawer.context'
import { UserContext } from '../../contexts/user.context'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'

function Header() {
  const navigate = useNavigate()
  const {
    state: { width },
    toggleDrawer,
  } = useContext(DrawerContext)

  const {
    user: { user_type },
    clearCurrentUser,
  } = useContext(UserContext)

  const handleLogout = () => {
    clearCurrentUser()
    localStorage.removeItem('x-access-token')
    navigate('/')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${width}px)` },
        ml: { md: `${width}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1}>
          <Typography
            variant="h6"
            noWrap
            component="h1"
            onClick={handleLogoClick}
            sx={{ cursor: 'pointer', display: 'inline' }}
          >
            Blood Donation System
          </Typography>
        </Box>

        {user_type === '' ? (
          <Button color="inherit" size="large" onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <Button color="inherit" size="large" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
