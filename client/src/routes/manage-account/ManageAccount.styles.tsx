import { Box, styled } from '@mui/material'

export const ManageAccountFormContainer = styled(Box)(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0',
  width: '100%',

  '& form': {
    width: '100%',
    maxWidth: '500px',
    marginTop: theme.spacing(1),

    '& > .submit-btn': {
      marginTop: theme.spacing(1),
    },

    '& .delete-account-btn': {
      marginTop: theme.spacing(1),
      float: 'right',
    },
  },
}))
