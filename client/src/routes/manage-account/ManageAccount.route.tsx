import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { deleteUserById, getUserByEmail, updateUser } from '../../api/users.api'
import { Message } from '../../components/snackbar-message/SnackbarMessage.component'
import { UserContext } from '../../contexts/user.context'
import { ManageAccountFormContainer } from './ManageAccount.styles'

function ManageAccount() {
  const INITIAL_MESSAGE: Message = {
    severity: 'success',
    content: '',
  }
  const [message, setMessage] = useState(INITIAL_MESSAGE)
  const { user, clearCurrentUser } = useContext(UserContext)

  const [checked, setChecked] = useState({
    checkboxPassword: false,
    checkboxPhone: false,
    checkboxAddress: false,
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
      .then(() =>
        setChecked({
          checkboxPassword: false,
          checkboxPhone: false,
          checkboxAddress: false,
        })
      )
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
    <ManageAccountFormContainer>
      <Typography component="h1" variant="h5" gutterBottom>
        Manage Account
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="checkboxPassword"
                checked={checked.checkboxPassword}
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
            disabled={!checked.checkboxPassword}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="checkboxPhone"
                checked={checked.checkboxPhone}
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
            value={updateForm.phone}
            onChange={handleTextChange}
            required
            type={'tel'}
            disabled={!checked.checkboxPhone}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="checkboxAddress"
                checked={checked.checkboxAddress}
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
            disabled={!checked.checkboxAddress}
          />
        </FormGroup>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="submit-btn"
        >
          Update
        </Button>

        <Button
          variant="text"
          color="error"
          startIcon={<DeleteForeverIcon />}
          onClick={deleteAccount}
          className="delete-account-btn"
        >
          Delete Account
        </Button>
      </Box>
    </ManageAccountFormContainer>
  )
}

export default ManageAccount
