import { Box, styled } from '@mui/material'

export const RegisterFormContainer = styled(Box)(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0',
  maxWidth: '500px',

  '& > form': {
    marginTop: theme.spacing(1),

    Button: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  },
}))
