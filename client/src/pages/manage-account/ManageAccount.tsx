import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { deleteUserById, getUserByEmail, updateUser } from '../../api/users.api'
import { Message } from '../../components/snackbar-message/SnackbarMessage'
import { UserContext } from '../../contexts/user.context'

function ManageAccount() {
  const INITIAL_MESSAGE: Message = {
    severity: 'success',
    content: '',
  }
  const [message, setMessage] = useState(INITIAL_MESSAGE)
  const { user, clearCurrentUser } = useContext(UserContext)

  const [checked, setChecked] = useState({
    password: false,
    phone: false,
    address: false,
  })

  const [updateForm, setUpdateForm] = useState({
    password: '',
    phone: '',
    address: '',
  })

  useEffect(() => {
    getUserByEmail(user.e_mail)
      .then((u) =>
        setUpdateForm({
          password: u.data.password,
          phone: u.data.phone,
          address: u.data.address,
        })
      )
      .catch((err) => console.error(err.message))
  }, [user])

  const handleTextChange = (event: ChangeEvent) => {
    const element = event.target as HTMLInputElement
    let { name, value } = element

    setUpdateForm({
      ...updateForm,
      [name]: value,
    })
  }

  const handleCheckedChange = (event: ChangeEvent) => {
    let name = event.target.id as keyof typeof checked

    setChecked({
      ...checked,
      [name]: !checked[name],
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateUser({ ...updateForm, e_mail: user.e_mail })
      .then(() => alert('User information has been successfully changed!'))
      .catch((err) => console.error(err.message))
  }

  const deleteAccount = (e: FormEvent) => {
    const deleted = window.confirm(
      'Are you sure you want to delete your account?'
    )

    if (deleted)
      deleteUserById(user.user_id)
        .then(() => clearCurrentUser())
        .catch((e) => console.error(e))
  }

  return (
    <Stack alignItems={'center'} pt={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0',
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Manage Account
        </Typography>
        <Box
          component="form"
          width={'100%'}
          maxWidth="500px"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          {message.content && (
            <Alert
              severity={message.severity}
              onClose={() => setMessage(INITIAL_MESSAGE)}
            >
              {message.content}
            </Alert>
          )}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id="password"
                  checked={checked.password}
                  onChange={handleCheckedChange}
                />
              }
              label="Update Password"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="New Password"
              id="password"
              value={updateForm.password}
              onChange={handleTextChange}
              required
              type={'password'}
              disabled={!checked.password}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id="phone"
                  checked={checked.phone}
                  onChange={handleCheckedChange}
                />
              }
              label="Update Phone"
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="New Phone Number"
              id="phone"
              value={updateForm.password}
              onChange={handleTextChange}
              required
              type={'tel'}
              disabled={!checked.phone}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id="address"
                  checked={checked.address}
                  onChange={handleCheckedChange}
                />
              }
              label="Update Address"
            />
            <TextField
              margin="normal"
              fullWidth
              name="address"
              label="New Address"
              id="address"
              value={updateForm.address}
              onChange={handleTextChange}
              required
              multiline
              rows={4}
              disabled={!checked.address}
            />
          </FormGroup>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            Update
          </Button>

          <Button
            variant="text"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={deleteAccount}
            sx={{ my: 2, float: 'right' }}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}

export default ManageAccount
