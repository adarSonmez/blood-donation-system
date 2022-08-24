import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import CancelIcon from '@mui/icons-material/Cancel'
import { useContext, useEffect, useState } from 'react'
import {
  deleteOrder,
  getOrdersByHospitalId,
  OrderForHospitalResponse,
} from '../../api/orders.api'
import { UserContext } from '../../contexts/user.context'
import { ThemeModeContext } from '../../contexts/themeMode.context'

function OrderHistory() {
  const { user } = useContext(UserContext)
  const mode = useContext(ThemeModeContext).theme.mode

  const [myOrders, setMyOrders] = useState<OrderForHospitalResponse[]>([])

  useEffect(() => {
    updateOrderHistory()
  }, [user])

  const updateOrderHistory = () => {
    getOrdersByHospitalId(user.user_id)
      .then((r) => setMyOrders(r.data))
      .catch((err) => console.error(err.message))
  }

  const cancelOrder = (order_id: number) => {
    deleteOrder(order_id)
      .then(() => updateOrderHistory())
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

  return (
    <Box>
      <TableContainer sx={{ maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h5" component={'h2'} gutterBottom align="center">
          Order History
        </Typography>
        <Table aria-label="order history table" sx={{ textAlign: 'center' }}>
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
            {myOrders.map((order) => (
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
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default OrderHistory
