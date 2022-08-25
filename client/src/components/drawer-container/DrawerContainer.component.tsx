import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useContext } from 'react'
import { DrawerContext } from '../../contexts/drawer.context'
import DrawerContent from '../drawer-content/DrawerContent.component'

function DrawerContainer() {
  const {
    state: { width, open },
    toggleDrawer,
  } = useContext(DrawerContext)

  return (
    <Box
      component="nav"
      sx={{ width: { md: width }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'flex' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
      >
        {<DrawerContent />}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'flex' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
        open
      >
        {<DrawerContent />}
      </Drawer>
    </Box>
  )
}

export default DrawerContainer
