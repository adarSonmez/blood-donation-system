import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

function Spinner() {
  return (
    <Box
      height={'80vh'}
      display="flex"
      alignItems={'center'}
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  )
}

export default Spinner
