import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { AmountOfBloodTypeResponse } from '../../api/banks.api'
import { BloodTypeTableContainer } from './BloodTypesTable.styles'

function BloodTypesTable({ types }: { types: AmountOfBloodTypeResponse[] }) {
  return (
    <Box>
      <BloodTypeTableContainer>
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
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Units (0.5L)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((t) => (
              <TableRow key={t.blood_type}>
                <TableCell align="center">{t.blood_type}</TableCell>
                <TableCell align="center">{t.num_of_blood}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </BloodTypeTableContainer>
    </Box>
  )
}

export default BloodTypesTable
