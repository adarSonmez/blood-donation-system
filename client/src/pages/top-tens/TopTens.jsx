import { useEffect, useState } from 'react'

import {
  getTopTenDonors,
  getTopTenHospitals,
  getTopTenReceptionists,
} from '../../api/tops.api'
import { useParams } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

function TopTens() {
  const params = useParams()
  const [tableData, setTableData] = useState([{ id: 0, name: '', amount: 0 }])
  const [displayData, setDisplayData] = useState({
    title: '',
    unit: '',
  })

  useEffect(() => {
    switch (params.type) {
      case 'donors':
        getTopTenDonors()
          .then((r) => {
            setTableData(
              r.data.map(({ donor_id, name, num_of_blood }) => {
                return {
                  id: donor_id,
                  name: name,
                  amount: num_of_blood,
                }
              })
            )
            setDisplayData({
              title: 'Top Donors',
              unit: 'Donations (Units)',
            })
          })
          .catch((err) => console.error(err.message))
        break
      case 'receptionists':
        getTopTenReceptionists()
          .then((r) => {
            setTableData(
              r.data.map(({ user_id, full_name, num_of_registration }) => {
                return {
                  id: user_id,
                  name: full_name,
                  amount: num_of_registration,
                }
              })
            )
            setDisplayData({
              title: 'Top Receptionists',
              unit: 'Registrations (Donors)',
            })
          })
          .catch((err) => console.error(err.message))
        break
      case 'hospitals':
        getTopTenHospitals()
          .then((r) => {
            setTableData(
              r.data.map(({ user_id, full_name, amount_of_blood }) => {
                return {
                  id: user_id,
                  name: full_name,
                  amount: amount_of_blood / 2,
                }
              })
            )
            setDisplayData({
              title: 'Top Hospitals',
              unit: 'Orders (Litters)',
            })
          })
          .catch((err) => console.error(err.message))
        break
      default:
        break
    }
  }, [params])

  return (
    <TableContainer sx={{ maxWidth: 700, margin: 'auto' }}>
      <Typography variant="h5" align="center" component="h3" gutterBottom>
        {displayData.title}
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell width={110}>Rank</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell width={110} align="right">{displayData.unit}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TopTens
