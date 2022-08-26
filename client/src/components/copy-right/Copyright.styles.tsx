import { Box, styled } from '@mui/material'

export const CopyrightContainer = styled(Box)(({ theme }) => ({
  height: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary,

  Avatar: {
    margin: `${10} !important`,
    backgroundColor: `${theme.palette.secondary.main} !important`,
  },
}))
