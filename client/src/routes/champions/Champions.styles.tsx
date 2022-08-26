import { Box, styled } from '@mui/material'

export const StyledTabsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(-2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  overflow: 'auto',
}))
