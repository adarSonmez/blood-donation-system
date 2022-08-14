import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getLeastAvailableBloodType,
  getMostAvailableBloodType,
  getNumOfTotalAvailableBlood,
  getTotalDonatedBlood,
} from '../../api/banks.api'
import {
  getTopTenDonors,
  getTopTenHospitals,
  getTopTenReceptionists,
} from '../../api/tops.api'
import { ThemeModeContext } from '../../contexts/themeMode.context'

function Homepage() {
  const navigate = useNavigate()
  const mode = useContext(ThemeModeContext).theme.mode

  const [totalBlood, setTotalBlood] = useState(1)
  const [numOfAvailable, setNumOfAvailable] = useState(1)
  const [mostAvailable, setMostAvailable] = useState({
    num_of_blood: 1,
    blood_type: '0+',
  })
  const [leastAvailable, setLeastAvailable] = useState({
    num_of_blood: 1,
    blood_type: '0-',
  })
  const [topDonor, setTopDonor] = useState({
    name: 'Loading...',
    num_of_blood: 1,
  })
  const [topRecep, setTopRecep] = useState({
    full_name: 'Loading...',
    num_of_registration: 1,
  })
  const [topHospital, setTopHospital] = useState({
    full_name: 'Loading...',
    amount_of_blood: 1,
  })

  useEffect(() => {
    setStats()
  }, [])

  const setStats = () => {
    getTotalDonatedBlood()
      .then((r) => setTotalBlood(r.data.total_donated_blood))
      .catch((err) => console.error(err.message))

    getNumOfTotalAvailableBlood()
      .then((r) => setNumOfAvailable(r.data.total_available))
      .catch((err) => console.error(err.message))

    getMostAvailableBloodType()
      .then((r) => setMostAvailable(r.data))
      .catch((err) => console.error(err.message))

    getLeastAvailableBloodType()
      .then((r) => setLeastAvailable(r.data))
      .catch((err) => console.error(err.message))

    getTopTenDonors()
      .then((r) => setTopDonor(r.data[0]))
      .catch((err) => console.error(err.message))

    getTopTenHospitals()
      .then((r) => setTopHospital(r.data[0]))
      .catch((err) => console.error(err.message))

    getTopTenReceptionists()
      .then((r) => setTopRecep(r.data[0]))
      .catch((err) => console.error(err.message))
  }

  const LIST_TEXT_DATA = [
    <ListItemText>
      {totalBlood / 2} liters of blood have been donated so far.
    </ListItemText>,
    <ListItemText>
      The most available blood type is
      {mostAvailable.blood_type} with
      {((mostAvailable.num_of_blood / numOfAvailable) * 100).toFixed(2)}
      %. {mostAvailable.num_of_blood / 2} litters
    </ListItemText>,
    <ListItemText>
      The least available blood type is {leastAvailable.blood_type} with
      {((leastAvailable.num_of_blood / numOfAvailable) * 100).toFixed(2)}
      %. ({leastAvailable.num_of_blood / 2} litters)
    </ListItemText>,
    <ListItemText>
      The donor who donated the most blood so far is {topDonor?.name} with
      {topDonor?.num_of_blood} donations ({topDonor?.num_of_blood / 2} litters).
    </ListItemText>,
    <ListItemText>
      Our receptionist that registers the most donors is {topRecep?.full_name}
      with {topRecep?.num_of_registration} registrations.
    </ListItemText>,
    <ListItemText>
      The hospital we supply the most blood so far is {topHospital?.full_name}
      with {topHospital?.amount_of_blood / 2} liters.
    </ListItemText>,
  ]

  return (
    <Box>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Statistics
      </Typography>

      <List>
        {LIST_TEXT_DATA.map((item, index) => (
          <ListItem key={index} sx={{ pl: 1 }}>
            <ListItemIcon>
              <StarIcon color={mode === 'light' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            {item}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
export default Homepage
