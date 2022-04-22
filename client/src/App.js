import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import HowToDonate from './pages/how-to-donate/HowToDonate';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Footer from './components/footer/Footer';

function App() {
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
