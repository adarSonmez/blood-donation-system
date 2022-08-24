import { lazy, Suspense, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../contexts/user.context'

import Homepage from '../../pages/homepage/Homepage'
import HowToDonate from '../../pages/how-to-donate/HowToDonate'
import Champions from '../../pages/champions/Champions'
import Login from '../../pages/login/Login'
import Spinner from '../spinner/Spinner'
import { Box } from '@mui/material'

const Register = lazy(() => import('../../pages/register/Register'))
const Donation = lazy(() => import('../../pages/donation/Donation'))
const OrderBlood = lazy(() => import('../../pages/order-blood/OrderBlood'))
const ManageOrders = lazy(
  () => import('../../pages/manage-orders/ManageOrders')
)
const ManageAccount = lazy(
  () => import('../../pages/manage-account/ManageAccount')
)

function Main() {
  const { user } = useContext(UserContext)

  return (
    <Box component="main" p={3}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/donation"
            element={
              user.user_type === 'receptionist' ? (
                <Donation />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/order-blood"
            element={
              user.user_type === 'hospital' ? (
                <OrderBlood />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/manage-orders"
            element={
              user.user_type === 'system_manager' ? (
                <ManageOrders />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/manage-account"
            element={
              user.e_mail ? <ManageAccount /> : <Navigate replace to="/" />
            }
          />
          <Route
            path="/login"
            element={user.e_mail ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              user.user_type === 'system_manager' ? (
                <Register />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route path="/champions" element={<Champions />} />
          <Route path="/how-to-donate" element={<HowToDonate />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Box>
  )
}

export default Main
