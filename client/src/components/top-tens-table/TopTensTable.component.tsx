import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { StyledTableContainer } from './TopTensTable.styles'

type TableData = {
  id: string
  name: string
  amount: number
}

type DisplayData = {
  title: string
  unit: string
}

type TopTensTableProps = {
  tableData: TableData[]
  displayData: DisplayData
}

function TopTensTable({ displayData, tableData }: TopTensTableProps) {
  return (
    <StyledTableContainer>
      <Typography
        variant="subtitle1"
        component="h6"
        align="center"
        gutterBottom
      >
        {displayData.title}
      </Typography>
      <Table aria-label="top-tens table">
        <TableHead>
          <TableRow>
            <TableCell width={110}>Rank</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell width={110} align="right">
              {displayData.unit}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

export default TopTensTable
