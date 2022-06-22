import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';

import ActionsDropdown from '../actions-dropdown/ActionsDropdown';
import './Navbar.css';

function Navbar() {
  const { user, setUser } = useContext(UserContext);


  const logout = () => {
    setUser({ id: '', name: '', email: '', type: '' });
    localStorage.removeItem('x-access-token');
  };

  return (
    <nav>
      <NavLink className="nav-items" to="/">
        Home
      </NavLink>
      {user.email ? (
        <>
          <ActionsDropdown user={user} />
          <span className="nav-items" onClick={logout}>
            Logout
          </span>
        </>
      ) : (
        <NavLink className="nav-items" to="/login">
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
