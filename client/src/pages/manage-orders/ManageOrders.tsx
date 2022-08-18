import { Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { getAllAvailableBloodTypes } from '../../api/banks.api'
import { getOrdersForAManager } from '../../api/orders.api'
import BloodTypesTable from '../../components/blood-types-table/BloodTypesTable'
import ManageOrdersTable from '../../components/manage-orders-table/ManageOrdersTable'
import { UserContext } from '../../contexts/user.context'

function ManageOrders() {
  const { user } = useContext(UserContext)

  const [orders, setOrders] = useState([])
  const [types, setTypes] = useState([])

  useEffect(() => {
    getOrdersForAManager(user.id)
      .then((r) => {
        setOrders(r.data)
      })
      .catch((err) => console.error(err))
  }, [user.id])

  useEffect(() => {
    getAllAvailableBloodTypes()
      .then((r) => setTypes(r.data))
      .catch((err) => console.error(err))
  }, [orders])

  const updateOrderTable = () => {}

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8} display="flex" alignItems="center" justifyContent={'center'}>
        <ManageOrdersTable
          orders={orders}
          updateOrderTable={updateOrderTable}
          types={types}
        />
      </Grid>
      <Grid item xs={12} lg={4} display="flex" alignItems="center" justifyContent={'center'}>
        <BloodTypesTable orders={orders} types={types} />
      </Grid>
    </Grid>
  )
}

export default ManageOrders
