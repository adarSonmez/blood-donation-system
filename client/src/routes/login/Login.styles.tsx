import { Box, styled } from '@mui/material'

export const LoginFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0',
  maxWidth: '500px',

  '& > form': {
    margin: theme.spacing(1),
  },

  '& .MuiAvatar-root': {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  Button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}))
