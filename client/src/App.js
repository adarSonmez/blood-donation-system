import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';
import HowToDonate from './pages/how-to-donate/HowToDonate';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

const API_URL = 'http://localhost:8000';

function App() {
  const getAllHospitals = () => {
    fetch(`${API_URL}/hospitals`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    getAllHospitals();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/how-to-donate" element={<HowToDonate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/** No match route approach */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
