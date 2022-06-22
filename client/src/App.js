import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';

import { decode } from './api/users.api';
import { UserContext } from './contexts/user.context';

import MyOrders from './components/my-orders/MyOrders';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

import Homepage from './pages/homepage/Homepage';
import HowToDonate from './pages/how-to-donate/HowToDonate';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import TopTens from './pages/top-tens/TopTens';
import Donation from './pages/donation/Donation';
import OrderBlood from './pages/order-blood/OrderBlood';
import ManageOrders from './pages/manage-orders/ManageOrders';
import ManageAccount from './pages/manage-account/ManageAccount';

function App() {
  const { user, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    decode({ token: localStorage.getItem('x-access-token') })
      .then((r) => {
        if (r.data.user) {
          const { id, name, email, type } = r.data.user;
          setCurrentUser({ id, name, email, type });
        }
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="App">
      <Header />
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
          element={user.email ? <ManageAccount /> : <Navigate replace to="/" />}
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
        <Route path="/top-tens" element={<TopTens />} />
        <Route path="/how-to-donate" element={<HowToDonate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
