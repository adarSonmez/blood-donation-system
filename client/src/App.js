import { Navigate, Route, Routes } from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';
import HowToDonate from './pages/how-to-donate/HowToDonate';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import TopTens from './pages/top-tens/TopTens';
import { useEffect, useState } from 'react';
import { decode } from './api/decode.api';
import Donation from './pages/donation/Donation';

function App() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    type: '',
  });

  useEffect(() => {
    decode({ token: localStorage.getItem('x-access-token') })
      .then((r) => {
        if (r.data.user) {
          const { name, email, type } = r.data.user;
          setUser({ name, email, type });
        }
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/how-to-donate" element={<HowToDonate />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/top-tens" element={<TopTens />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        {/** No match route approach */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
