import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import userActions, { SideMenuItem } from '../../data/userActions'
import { useNavigate } from 'react-router-dom'
import SwitchTheme from '../switch-theme/SwitchTheme'
import { UserContext } from '../../contexts/user.context'
import { useContext, useEffect, useState } from 'react'
import { Box } from '@mui/system'
import CopyRight from '../copy-right/Copyright'
import { Link, Typography } from '@mui/material'
import InfoForTestLogin from '../InfoForTestLogin/InfoForTestLogin'

function DrawerContent() {
  const navigate = useNavigate()
  const handleListItemClick = (to: string) => navigate(to)
  const {
    user: { type },
  } = useContext(UserContext)
  const [privateMenus, setPrivateMenus] = useState<SideMenuItem[]>([])

  useEffect(() => {
    setPrivateMenus(type ? userActions[type] : [])
  }, [type])

  return (
    <>
      <Toolbar>
        <SwitchTheme />
      </Toolbar>
      <Divider />
      <List>
        {userActions.common.map(({ link, to, icon }) => (
          <ListItem
            key={to}
            disablePadding
            onClick={() => handleListItemClick(to)}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={link} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box flex={1}>
        {privateMenus.length > 0 ? (
          <List>
            {privateMenus.map(({ link, to, icon }) => (
              <ListItem
                key={to}
                disablePadding
                onClick={() => handleListItemClick(to)}
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={link} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <InfoForTestLogin />
        )}
      </Box>

      <Divider />
      <CopyRight />
    </>
  )
}

export default DrawerContent
