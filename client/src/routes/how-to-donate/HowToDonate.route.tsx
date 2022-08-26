import { useState, useEffect } from 'react'
import { Bank, getBanks } from '../../api/banks.api'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, List, ListItem, ListItemIcon, Typography } from '@mui/material'
import { LocationOfBanks } from './HowToDonate.styles'

function HowToDonate() {
  const [banks, setBanks] = useState<Bank[]>([])

  useEffect(() => {
    getBanks()
      .then((r) => setBanks(r.data))
      .catch((err) => console.error(err.message))
  }, [])

  return (
    <Box>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        How to Donate
      </Typography>
      <Typography
        variant="body1"
        component="p"
        align="center"
        gutterBottom
        color="textSecondary"
      >
        You can visit one of our listed blood banks at any time and donate
        blood.
      </Typography>

      <LocationOfBanks>
        {banks.map(({ bank_id, address }) => (
          <ListItem key={bank_id}>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            {address}
          </ListItem>
        ))}
      </LocationOfBanks>
    </Box>
  )
}

export default HowToDonate
