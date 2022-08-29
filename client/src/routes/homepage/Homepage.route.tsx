import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StarIcon from '@mui/icons-material/Star'
import { useState, useEffect, useContext } from 'react'

import {
  AmountOfBloodTypeResponse,
  getAllBloodTypes,
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
  const mode = useContext(ThemeModeContext).theme.mode

  const [totalBlood, setTotalBlood] = useState(1)
  const [numOfAvailable, setNumOfAvailable] = useState(1)
  const [allBloodTypes, setAllBloodTypes] = useState<
    AmountOfBloodTypeResponse[]
  >([])
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

    getAllBloodTypes()
      .then((r) => setAllBloodTypes(r.data))
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
      The most available blood type is {allBloodTypes[0]?.blood_type} with{' '}
      {((allBloodTypes[0]?.num_of_blood / numOfAvailable) * 100).toFixed(2)}
      %. ({allBloodTypes[0]?.num_of_blood / 2} litters)
    </ListItemText>,
    <ListItemText>
      The least available blood type is {allBloodTypes[7]?.blood_type} with{' '}
      {((allBloodTypes[7]?.num_of_blood / numOfAvailable) * 100).toFixed(2)}
      %. ({allBloodTypes[7]?.num_of_blood / 2} litters)
    </ListItemText>,
    <ListItemText>
      The donor who donated the most blood so far is {topDonor?.name} with{' '}
      {topDonor?.num_of_blood} donations ({topDonor?.num_of_blood / 2} litters).
    </ListItemText>,
    <ListItemText>
      Our receptionist that registers the most donors is {topRecep?.full_name}{' '}
      with {topRecep?.num_of_registration} registrations.
    </ListItemText>,
    <ListItemText>
      The hospital we supply the most blood so far is {topHospital?.full_name}{' '}
      with {topHospital?.amount_of_blood / 2} liters.
    </ListItemText>,
  ]

  return (
    <Box>
      <Typography variant="h5" component="h2" align="center">
        Donate Blood{' '}
        <FavoriteIcon
          color={mode === 'light' ? 'primary' : 'inherit'}
          fontSize="small"
        />
      </Typography>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        <FavoriteIcon
          color={mode === 'light' ? 'primary' : 'inherit'}
          fontSize="small"
        />{' '}
        Save Life{' '}
      </Typography>

      <List>
        {LIST_TEXT_DATA.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              pl: {
                xs: 0,
                sm: 0,
                md: 2,
                lg: 2,
              },
            }}
          >
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
