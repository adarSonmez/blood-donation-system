import { Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import {
  AmountOfBloodTypeResponse,
  getAllAvailableBloodTypes,
} from '../../api/banks.api'
import {
  getOrdersForAManager,
  OrderForManagerResponse,
} from '../../api/orders.api'
import BloodTypesTable from '../../components/blood-types-table/BloodTypesTable'
import ManageOrdersTable from '../../components/manage-orders-table/ManageOrdersTable'
import { UserContext } from '../../contexts/user.context'

function ManageOrders() {
  const { user } = useContext(UserContext)

  const [orders, setOrders] = useState<OrderForManagerResponse[]>([])
  const [types, setTypes] = useState<AmountOfBloodTypeResponse[]>([])

  useEffect(() => {
    getOrdersForAManager(user.user_id)
      .then((r) => {
        setOrders(r.data)
      })
      .catch((err) => console.error(err))
  }, [user.user_id])

  useEffect(() => {
    getAllAvailableBloodTypes()
      .then((r) => setTypes(r.data))
      .catch((err) => console.error(err))
  }, [orders])

  const updateOrderTable = () => {}

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        lg={8}
        display="flex"
        alignItems="center"
        justifyContent={'center'}
      >
        <ManageOrdersTable
          orders={orders}
          updateOrderTable={updateOrderTable}
          types={types}
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={4}
        display="flex"
        alignItems="center"
        justifyContent={'center'}
      >
        <BloodTypesTable types={types} />
      </Grid>
    </Grid>
  )
}

export default ManageOrders
