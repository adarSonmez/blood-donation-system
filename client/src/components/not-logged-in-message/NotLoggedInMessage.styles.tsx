import { styled } from '@mui/material'
import { Box } from '@mui/system'

export const StyledMessageBox = styled(Box)(({ theme }) => ({
  height: '100%',
  flex: 1,
  padding: '0 1.2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}))
