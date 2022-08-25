import { Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import {
  getOrdersByHospitalId,
  OrderForHospitalResponse,
} from '../../api/orders.api'
import OrderBloodForm from '../../components/order-blood-form/OrderBloodForm.component'
import OrderHistory from '../../components/order-history/OrderHistory.component'
import { UserContext } from '../../contexts/user.context'

function OrderBlood() {
  const { user } = useContext(UserContext)
  const [myOrders, setMyOrders] = useState<OrderForHospitalResponse[]>([])

  useEffect(() => {
    updateOrderHistory()
  }, [user])

  const updateOrderHistory = () => {
    getOrdersByHospitalId(user.user_id)
      .then((r) => setMyOrders(r.data))
      .catch((err) => console.error(err.message))
  }
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={4}>
        <OrderBloodForm updateOrders={updateOrderHistory} />
      </Grid>
      <Grid
        item
        xs={12}
        lg={8}
        display="flex"
        alignItems="center"
        justifyContent={'center'}
      >
        <OrderHistory myOrders={myOrders} updateOrders={updateOrderHistory} />
      </Grid>
    </Grid>
  )
}

export default OrderBlood
