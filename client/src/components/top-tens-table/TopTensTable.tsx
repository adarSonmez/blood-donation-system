import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

type TableData = {
  id: number
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
    <TableContainer sx={{ maxWidth: 600, margin: 'auto' }}>
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
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TopTensTable
