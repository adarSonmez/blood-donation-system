import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <NavLink className="nav-items" to="/">Home</NavLink>
      <NavLink className="nav-items" to="/login">
        Login
      </NavLink>
      <span className="nav-items" onClick={() => navigate('logout')}>
        Logout
      </span>
    </nav>
  );
}

export default Navbar;
