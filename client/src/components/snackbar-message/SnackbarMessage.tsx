import { Snackbar } from '@mui/material'
import { forwardRef, useState } from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

type SnackbarMessageProps = {
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
  clearMessage: () => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

function SnackbarMessage({
  severity,
  message,
  clearMessage,
}: SnackbarMessageProps) {
  const [open, setOpen] = useState(true)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    clearMessage()
    setOpen(false)
  }
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarMessage
