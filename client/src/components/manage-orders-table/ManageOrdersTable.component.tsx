import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { AmountOfBloodTypeResponse } from '../../api/banks.api'
import { OrderForManagerResponse, updateOrderState } from '../../api/orders.api'
import { BloodType } from '../../utils/common.types'

type ManageOrdersTableProps = {
  orders: OrderForManagerResponse[]
  updateTables: () => void
  types: AmountOfBloodTypeResponse[]
}

type ChangeOrderStateParams = {
  order_id: string
  amount: number
  blood_type: BloodType
}

function ManageOrdersTable(props: ManageOrdersTableProps) {
  const { updateTables, orders, types } = props

  const approveOrder = ({
    order_id,
    amount,
    blood_type,
  }: ChangeOrderStateParams) => {
    const stock = types.filter((t) => t.blood_type === blood_type)[0]
    if (stock.num_of_blood < amount)
      alert('There is not enough blood available!')
    else {
      updateOrderState({ order_id, state: 'approved' })
        .then(() => updateTables())
        .catch((err) => console.error(err))
    }
  }

  const rejectOrder = ({ order_id }: ChangeOrderStateParams) => {
    updateOrderState({ order_id, state: 'rejected' })
      .then(() => updateTables())
      .catch((err) => console.error(err))
  }

  return (
    <TableContainer>
      <Typography
        variant="subtitle1"
        component="h6"
        align="center"
        gutterBottom
      >
        Manage Orders
      </Typography>
      <Table aria-label="manage orders table">
        <TableHead>
          <TableRow>
            <TableCell>Hospital</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell align="center">Approve</TableCell>
            <TableCell align="center">Reject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length !== 0 ? (
            orders.map(
              ({ blood_type, amount, order_date, order_id, full_name }) => (
                <TableRow key={order_id}>
                  <TableCell>{full_name}</TableCell>
                  <TableCell>{blood_type}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>
                    {new Date(order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <CheckCircleIcon
                      cursor="pointer"
                      color="success"
                      onClick={() =>
                        approveOrder({ order_id, amount, blood_type })
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <CancelOutlinedIcon
                      cursor="pointer"
                      color="error"
                      onClick={() =>
                        rejectOrder({ order_id, amount, blood_type })
                      }
                    />
                  </TableCell>
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={6}>
                No orders to manage
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ManageOrdersTable
