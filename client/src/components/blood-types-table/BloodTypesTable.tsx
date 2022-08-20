import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { AmountOfBloodTypeResponse } from '../../api/banks.api'

function BloodTypesTable({ types }: { types: AmountOfBloodTypeResponse[] }) {
  return (
    <TableContainer sx={{maxWidth: "250px"}}>
      <Typography
        variant="subtitle1"
        component="h6"
        align="center"
        gutterBottom
      >
        Blood Types
      </Typography>
      <Table aria-label="remaining blood types table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Type</TableCell>
            <TableCell align='center'>Units (0.5L)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {types.map((t) => (
            <TableRow key={t.blood_type}>
              <TableCell align='center'>{t.blood_type}</TableCell>
              <TableCell align='center'>{t.num_of_blood}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BloodTypesTable
