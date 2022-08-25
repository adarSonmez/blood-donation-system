import { styled, TableContainer } from '@mui/material'

export const BloodTypeTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  maxWidth: '240px',
  position: 'fixed',
  top: 88,
  right: 25,

  [theme.breakpoints.down('lg')]: {
    position: 'static',
  },

  th: {
    borderBottom: `1px solid ${theme.palette.info.light}`,
  },

  td: {
    padding: '15px',
    border: `1px solid ${theme.palette.info.light}`,
  },
}))
