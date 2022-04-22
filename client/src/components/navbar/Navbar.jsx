import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink className="log-buttons" to="/login">
        Login
      </NavLink>
      <span className="log-buttons" onClick={() => navigate('logout')}>
        Logout
      </span>
    </nav>
  );
}

export default Navbar;
