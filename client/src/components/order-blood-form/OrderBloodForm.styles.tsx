import { styled } from '@mui/material'
import { Box } from '@mui/system'

export const StyledOrderForm = styled(Box)(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0',
  width: "100%",
  maxWidth: '400px',
}))
