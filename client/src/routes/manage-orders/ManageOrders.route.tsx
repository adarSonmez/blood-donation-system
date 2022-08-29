import { Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import {
  AmountOfBloodTypeResponse,
  getAllBloodTypes,
} from '../../api/banks.api'
import {
  getOrdersForAManager,
  OrderForManagerResponse,
} from '../../api/orders.api'
import BloodTypesTable from '../../components/blood-types-table/BloodTypesTable.component'
import ManageOrdersTable from '../../components/manage-orders-table/ManageOrdersTable.component'
import { UserContext } from '../../contexts/user.context'

function ManageOrders() {
  const { user } = useContext(UserContext)

  const [orders, setOrders] = useState<OrderForManagerResponse[]>([])
  const [types, setTypes] = useState<AmountOfBloodTypeResponse[]>([])
  const [updateNum, setUpdateNum] = useState(0)

  useEffect(() => {
    getOrdersForAManager(user.user_id)
      .then((r) => {
        setOrders(r.data)
      })
      .catch((err) => console.error(err))

    getAllBloodTypes()
      .then((r) => setTypes(r.data))
      .catch((err) => console.error(err))
  }, [user.user_id, updateNum])

  const updateTables = () => {
    setUpdateNum((prev) => prev + 1)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={9}>
        <ManageOrdersTable
          orders={orders}
          updateTables={updateTables}
          types={types}
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
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
