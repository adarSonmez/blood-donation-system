import { lazy, Suspense, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../contexts/user.context'

import Homepage from '../../routes/homepage/Homepage.route'
import HowToDonate from '../../routes/how-to-donate/HowToDonate.route'
import Champions from '../../routes/champions/Champions.route'
import Login from '../../routes/login/Login.route'
import Spinner from '../spinner/Spinner.component'
import { Box } from '@mui/material'

const Register = lazy(() => import('../../routes/register/Register.route'))
const Donation = lazy(() => import('../../routes/donation/Donation.route'))
const OrderBlood = lazy(() => import('../../routes/order-blood/OrderBlood.route'))
const ManageOrders = lazy(() => import('../../routes/manage-orders/ManageOrders.route'))
const ManageAccount = lazy(() => import('../../routes/manage-account/ManageAccount.route'))

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
