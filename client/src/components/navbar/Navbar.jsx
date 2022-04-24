import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const unsub = setLoggedIn(false);
    return unsub;
  }, []);

  return (
    <nav>
      <NavLink className="nav-items" to="/">
        Home
      </NavLink>
      <div className="nav-items user-type" to="/">
        The Word | Hospital
      </div>
      {loggedIn ? (
        <span className="nav-items" onClick={() => navigate('logout')}>
          Logout
        </span>
      ) : (
        <NavLink className="nav-items" to="/login">
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
