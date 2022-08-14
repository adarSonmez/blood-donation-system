import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import Toolbar from '@mui/material/Toolbar'
import userActions from '../../data/userActions'
import { useNavigate } from 'react-router-dom'
import SwitchTheme from '../switch-theme/SwitchTheme'

function DrawerContent() {
  const navigate = useNavigate()
  const handleListItemClick = (to: string) => {
    navigate(to)
  }

  return (
    <div>
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
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default DrawerContent
