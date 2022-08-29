import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bank, getBanks } from '../../api/banks.api'
import { checkDonor, postDonation } from '../../api/donations.api'
import { Message } from '../../components/snackbar-message/SnackbarMessage.component'
import { UserContext } from '../../contexts/user.context'
import bloodTypes from '../../data/bloodTypes'
import { BloodType } from '../../utils/common.types'
import { DonationFormContainer, SearchSSNContainer } from './Donation.styles'

function Donation() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [locked, setLocked] = useState(true)
  const [searched, setSearched] = useState(false)

  const [banks, setBanks] = useState<Bank[]>([
    {
      bank_id: '',
      manager: '',
      address: '',
      capacity: 0,
      size: 0,
    },
  ])
  const [message, setMessage] = useState<Message>({
    severity: 'success',
    content: '',
  })

  const [form1, setFrom1] = useState({ donor_id: '' })
  const [form2, setForm2] = useState({
    name: '',
    blood_type: '0-' as BloodType,
    bank_id: '',
  })

  useEffect(() => {
    getBanks()
      .then((r) => {
        setBanks(r.data.filter((bank) => bank.size < bank.capacity))
      })
      .catch((err) => console.error(err))
  }, [])

  const handleChange = (
    event: ChangeEvent | SelectChangeEvent<string | BloodType>,
    formNo: number
  ) => {
    const element = event.target as HTMLInputElement
    let name = element.name
    let value = element.value

    if (formNo === 1) {
      setSearched(false)
      setFrom1({ ...form1, [name]: value })
    } else if (formNo === 2) setForm2({ ...form2, [name]: value })
  }

  const searchSSN = (event: FormEvent) => {
    event.preventDefault()
    setSearched(true)

    checkDonor(form1.donor_id || '').then((r) => {
      if (!r.data.donor) {
        setMessage({
          severity: 'info',
          content: `Donor is not registered. Please enter donor information.`,
        })
        setForm2({ name: '', blood_type: '0-', bank_id: '' })
        setLocked(false)
      } else {
        setLocked(true)
        setForm2({
          ...form2,
          name: r.data.donor.name,
          blood_type: r.data.donor.blood_type,
        })
      }
    })
  }

  const donateBlood = (event: FormEvent) => {
    event.preventDefault()

    if (!searched)
      setMessage({
        severity: 'warning',
        content:
          "Please search user's SSN first and then click the search button!",
      })
    else
      postDonation({
        ...form2,
        donor_id: form1.donor_id,
        recep_id: user.user_id,
      })
        .then(() => {
          alert('Donation successful!')
          navigate('/')
        })
        .catch((err) => console.error(err.message))
  }

  return (
    <Stack alignItems={'center'}>
      <SearchSSNContainer>
        <Typography component="h1" variant="h5" gutterBottom>
          Donate Blood
        </Typography>
        <Stack
          component="form"
          onSubmit={searchSSN}
          mt={1}
          direction="row"
          width={350}
        >
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="donor_id"
            label="Search SSN"
            type="text"
            id="donor_id"
            autoComplete="donor_id"
            value={form1.donor_id}
            onChange={(e) => handleChange(e, 1)}
          />
          <Button aria-label="search-ssn" type="submit">
            <SearchIcon />
          </Button>
        </Stack>
      </SearchSSNContainer>

      <DonationFormContainer>
        {message.content && (
          <Alert
            severity={message.severity}
            onClose={() =>
              setMessage({
                severity: 'success',
                content: '',
              })
            }
          >
            {message.content}
          </Alert>
        )}
        <Box component="form" onSubmit={donateBlood}>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="donor_id"
            placeholder="SSN of donor"
            type="text"
            id="donor_id"
            autoComplete="donor_id"
            value={form1.donor_id}
            disabled={true}
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Full name"
            type="text"
            id="full-name"
            autoComplete="name"
            value={form2.name}
            disabled={locked}
            onChange={(e) => handleChange(e, 2)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="select_blood_type">Blood Type</InputLabel>
            <Select
              size="small"
              labelId="select_blood_type"
              id="blood_type"
              name="blood_type"
              onChange={(e) => handleChange(e, 2)}
              required
              label="Blood Type"
              value={form2.blood_type}
              disabled={locked}
            >
              {bloodTypes.map((bloodType) => (
                <MenuItem key={bloodType} value={bloodType}>
                  {bloodType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="select_bank">Bank</InputLabel>
            <Select
              size="small"
              labelId="select_bank"
              id="bank_id"
              name="bank_id"
              onChange={(e) => handleChange(e, 2)}
              required
              label="Bank"
              value={form2.bank_id}
            >
              {banks.map((bank) => (
                <MenuItem key={bank.bank_id} value={bank.bank_id}>
                  {bank.address}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" fullWidth variant="contained">
            Donate Blood
          </Button>
        </Box>
      </DonationFormContainer>
    </Stack>
  )
}

export default Donation
