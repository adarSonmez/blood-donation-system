import { Box, Typography } from '@mui/material'

function InfoForTestLogin() {
  return (
    <Box
      sx={{
        height: '100%',
        flex: 1,
        padding: '0 1.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      color="text.secondary"
    >
      <Typography variant="body1" color="text.secondary">
        Please login to access private menus!
      </Typography>
    </Box>
  )
}

export default InfoForTestLogin
