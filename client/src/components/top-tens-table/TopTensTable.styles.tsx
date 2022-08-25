import { Box, styled } from '@mui/material'

export const StyledTableContainer = styled(Box)({
  maxWidth: 600,
  margin: 'auto',

  'tbody td': {
    '&:last-child td, &:last-child th': { border: 0 },
  },
})
