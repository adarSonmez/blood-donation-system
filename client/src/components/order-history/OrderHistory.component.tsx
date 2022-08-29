import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import CancelIcon from '@mui/icons-material/Cancel'
import { useContext, useState } from 'react'
import { deleteOrder } from '../../api/orders.api'
import { ThemeModeContext } from '../../contexts/themeMode.context'
import TablePaginationActions from '../table-pagination-actions/TablePaginationActions.component'

type OrderHistoryProps = {
  myOrders: any[]
  updateOrders: () => void
}

function OrderHistory({ myOrders, updateOrders }: OrderHistoryProps) {
  const mode = useContext(ThemeModeContext).theme.mode
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const cancelOrder = (order_id: string) => {
    deleteOrder(order_id)
      .then(() => updateOrders())
      .catch((err) => console.error(err))
  }

  const setBGColor = (status: string) => {
    switch (status) {
      case 'approved':
        return mode === 'light' ? '#6f8' : '#052'
      case 'rejected':
        return mode === 'light' ? '#f91' : '#600'
      default:
        return mode === 'light' ? '#fdf' : '#223'
    }
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box width={'100%'}>
      <TableContainer sx={{ margin: 'auto' }}>
        <Typography variant="h5" component={'h2'} gutterBottom align="center">
          Order History
        </Typography>
        <Table aria-label="order history table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Units (0.5L)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? myOrders.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : myOrders
            ).map((order) => (
              <TableRow
                key={order.order_id}
                style={{ backgroundColor: setBGColor(order.state) }}
              >
                <TableCell>{order.blood_type}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  {new Date(order.order_date).toDateString()}
                </TableCell>
                <TableCell>{order.state}</TableCell>
                <TableCell>
                  {order.state === 'waiting' ? (
                    <CancelIcon
                      onClick={() => cancelOrder(order.order_id)}
                      color={'error'}
                      sx={{ cursor: 'pointer' }}
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={myOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default OrderHistory
