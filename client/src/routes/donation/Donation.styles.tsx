import { styled } from '@mui/material'
import { Box } from '@mui/system'

export const SearchSSNContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0',
  maxWidth: '350px',

  TextField: {
    flex: 1,
  },

  Button: {
    height: '40px',
    bottom: '-15px',
  },
})

export const DonationFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0',
  width: '350px',
  marginTop: theme.spacing(-1),

  form: {
    marginTop: theme.spacing(1),
  },

  Button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },

  '& .MuiAlert-root': {
    marginTop: theme.spacing(3),
  },

  '& .MuiSelect-select': {
    maxWidth: 350,
  },
}))
