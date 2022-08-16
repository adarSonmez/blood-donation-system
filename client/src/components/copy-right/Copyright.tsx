import { Box, Link, Typography } from '@mui/material'

function CopyRight() {
  return (
    <Box
      sx={{
        height: '70px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '0',
      }}
      bottom="0"
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://adarsonmez.software/">
          Adar Sönmez
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  )
}

export default CopyRight
