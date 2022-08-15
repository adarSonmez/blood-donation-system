import { lazy, Suspense, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../contexts/user.context'

import Homepage from '../../pages/homepage/Homepage'
import HowToDonate from '../../pages/how-to-donate/HowToDonate'
import TopTens from '../../pages/top-tens/TopTens'
import Login from '../../pages/login/Login'
import MyOrders from '../../components/my-orders/MyOrders'

const Register = lazy(() => import('../../pages/register/Register'))
const Donation = lazy(() => import('../../pages/donation/Donation'))
const OrderBlood = lazy(() => import('../../pages/order-blood/OrderBlood'))
const ManageOrders = lazy(() => import('../../pages/manage-orders/ManageOrders'))
const ManageAccount = lazy(() => import('../../pages/manage-account/ManageAccount'))

function Main() {
  const { user } = useContext(UserContext)

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/donation"
            element={
              user.type === 'receptionist' ? (
                <Donation />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/order-blood"
            element={
              user.type === 'hospital' ? (
                <OrderBlood />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/my-orders"
            element={
              user.type === 'hospital' ? (
                <MyOrders />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/manage-orders"
            element={
              user.type === 'system_manager' ? (
                <ManageOrders />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/manage-account"
            element={
              user.email ? <ManageAccount /> : <Navigate replace to="/" />
            }
          />
          <Route
            path="/login"
            element={user.email ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              user.type === 'system_manager' ? (
                <Register />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route path="/top-tens/:type" element={<TopTens />} />
          <Route path="/how-to-donate" element={<HowToDonate />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </main>
  )
}

export default Main
