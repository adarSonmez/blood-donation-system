import Navbar from '../navbar/Navbar';
import './Header.css';

function Header({ user, setUser }) {
  return (
    <header>
      <Navbar user={user} setUser={setUser} />
    </header>
  );
}

export default Header;
