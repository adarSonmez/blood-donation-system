import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { StyledMessageBox } from './NotLoggedInMessage.styles'

function InfoForTestLogin() {
  return (
    <StyledMessageBox>
      <Typography variant="body1">
        Please <Link to="/login">login</Link> to access private menus!
      </Typography>
    </StyledMessageBox>
  )
}

export default InfoForTestLogin
