import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { Box, Stack } from '@mui/system'
import { ChangeEvent, FormEvent, useState } from 'react'
import { register, SystemUserType } from '../../api/users.api'
import { Message } from '../../components/snackbar-message/SnackbarMessage.component'
import { RegisterFormContainer } from './Register.styles'

function Register() {
  const INITIAL_MESSAGE: Message = {
    severity: 'success',
    content: '',
  }
  const [message, setMessage] = useState(INITIAL_MESSAGE)

  const [form, setForm] = useState({
    full_name: '',
    e_mail: '',
    password: '',
    phone: '',
    address: '',
    user_type: 'receptionist' as SystemUserType,
  })

  const handleChange = (event: ChangeEvent | SelectChangeEvent) => {
    const element = event.target as HTMLInputElement
    let { name, value } = element

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // check if all fields are filled
    if (form.full_name === '' || form.e_mail === '' || form.password === '') {
      setMessage({
        severity: 'error',
        content: 'Please fill all fields',
      })
      return
    }

    register(form)
      .then((res) => {
        if (res.data.success)
          setMessage({
            severity: 'success',
            content: 'Successfully registered!',
          })
        else
          setMessage({
            severity: 'warning',
            content: 'This e-mail is already registered!',
          })
      })
      .catch((err) =>
        setMessage({
          severity: 'error',
          content: err.message,
        })
      )
  }

  return (
    <RegisterFormContainer>
      <Typography component="h1" variant="h5" gutterBottom>
        Register User
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {message.content && (
          <Alert
            severity={message.severity}
            onClose={() => setMessage(INITIAL_MESSAGE)}
          >
            {message.content}
          </Alert>
        )}
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          name="full_name"
          label="Full Name"
          type="text"
          id="full_name"
          autoComplete="full_name"
          value={form.full_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="e_mail"
          label="Email Address"
          name="e_mail"
          autoComplete="e_mail"
          autoFocus
          size="small"
          type="email"
          value={form.e_mail}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Temporary Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Phone Number"
          type="tel"
          id="phone"
          autoComplete="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          id="address"
          autoComplete="address"
          value={form.address}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="select_user_label">User Type</InputLabel>
          <Select
            labelId="select_user_label"
            id="user_type"
            name="user_type"
            onChange={handleChange}
            required
            label="User Type"
            value={form.user_type}
          >
            <MenuItem value={'receptionist'}>Receptionist</MenuItem>
            <MenuItem value={'hospital'}>Hospital</MenuItem>
            <MenuItem value={'system_manager'}>System Manager</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Register
        </Button>
      </Box>
    </RegisterFormContainer>
  )
}

export default Register
