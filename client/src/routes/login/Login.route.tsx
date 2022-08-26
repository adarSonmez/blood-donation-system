import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  decode,
  getRandomManager,
  getUserByEmail,
  login,
  LoginRequest,
} from '../../api/users.api'
import { UserContext } from '../../contexts/user.context'

import { Stack } from '@mui/system'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Alert } from '@mui/material'
import { LoginFormContainer } from './Login.styles'

function Login() {
  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [randomManMail, setRandomManMail] = useState('adarsonmz@gmail.com')
  const [userData, setUserData] = useState<LoginRequest>({
    e_mail: '',
    password: '',
  })

  useEffect(() => {
    getRandomManager()
      .then((m) => setRandomManMail(m.data.e_mail))
      .catch((e) => console.error(e))
  }, [])

  const handleChange = (event: ChangeEvent) => {
    const element = event.target as HTMLInputElement
    let { name, value } = element

    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userData.e_mail === '' || userData.password === '') {
      console.log(userData)
      return
    }

    login(userData)
      .then((r) => {
        if (!r.data.success) setError(r.data.message)
        else {
          localStorage.setItem('x-access-token', r.data.token)
          // Make sure token is not broken
          decode({ token: localStorage.getItem('x-access-token') })
            .then((r1) => {
              if (r1.data.user.e_mail !== '') {
                getUserByEmail(r1.data.user.e_mail).then((r2) => {
                  setCurrentUser(r2.data)
                  navigate('/')
                })
              }
            })
            .catch((err) => setError(err.message))
          navigate('/')
        }
      })
      .catch((e) => setError(e.message))
  }

  return (
    <Stack alignItems={'center'}>
      <LoginFormContainer>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          For security reasons, only system managers can register system users
          (receptionists, hospitals, system managers).
          <br />
          <br />
          If you wish, click here to use the login options we created for
          testing purposes, or click{' '}
          <Link href={`mailto:${randomManMail}`} color="secondary">
            here
          </Link>{' '}
          to contact one of our system managers to register you to the system.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}
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
            color="secondary"
            value={userData.e_mail}
            onChange={handleChange}
            type="email"
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            color="secondary"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button color="secondary" type="submit" fullWidth variant="contained">
            Login
          </Button>
        </Box>
      </LoginFormContainer>
    </Stack>
  )
}

export default Login
