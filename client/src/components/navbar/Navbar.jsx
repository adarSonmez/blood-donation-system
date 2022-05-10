import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, setUser }) {
  

  const logout = () => {
    setUser({ name: '', email: '', type: '' });
    localStorage.removeItem('x-access-token');
  };



  return (
    <nav>
      <NavLink className="nav-items" to="/">
        Home
      </NavLink>
      <div className="nav-items user-type" to="/">
        {user.name}
      </div>
      {user.email ? (
        <span className="nav-items" onClick={logout}>
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
