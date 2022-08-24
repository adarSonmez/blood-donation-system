import {
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
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { orderBlood, OrderBloodRequest } from '../../api/orders.api'
import { getRandomManager } from '../../api/users.api'
import { UserContext } from '../../contexts/user.context'
import bloodTypes from '../../data/bloodTypes'
import { BloodType } from '../../utils/common.types'

function OrderBloodForm({ updateOrders }: { updateOrders: () => void }) {
  const { user } = useContext(UserContext)

  const [orderForm, setOrderForm] = useState<OrderBloodRequest>({
    blood_type: '0-' as BloodType,
    amount: 1,
    hospital_id: 0,
    man_id: 0,
  })

  const handleChange = (event: ChangeEvent | SelectChangeEvent<BloodType>) => {
    const element = event.target as HTMLInputElement
    let name = element.name
    let value = element.value

    setOrderForm({ ...orderForm, [name]: value })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const res = await getRandomManager()
      const man_id = res.data.user_id

      await orderBlood({ ...orderForm, hospital_id: user.user_id, man_id })
      updateOrders()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Stack alignItems={'center'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0',
          maxWidth: '500px',
        }}
      >
        <Typography variant="h5" gutterBottom component={'h2'}>
          Order Blood
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select_blood_type">Blood Type</InputLabel>
          <Select
            labelId="select_blood_type"
            id="blood_type"
            name="blood_type"
            onChange={(e) => handleChange(e)}
            required
            label="Blood Type"
            variant="standard"
            value={orderForm.blood_type}
          >
            {bloodTypes.map((bloodType) => (
              <MenuItem key={bloodType} value={bloodType}>
                {bloodType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="standard"
          fullWidth
          margin="normal"
          label="Amount (Unit: 0.5L)"
          name="amount"
          onChange={handleChange}
          type="number"
          value={orderForm.amount}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  )
}

export default OrderBloodForm
