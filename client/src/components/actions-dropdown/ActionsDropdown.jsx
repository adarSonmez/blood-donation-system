import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionsDropdown.css';

function ActionsDropdown({ user }) {
  const [chevron, setChevron] = useState('down');
  const [hidden, setHidden] = useState('hidden-actions');
  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) setActions(userActions[user.type]);
    console.log(user.type);
    console.log(actions);
  }, [user]);

  const toggleDropdown = () => {
    chevron === 'down' ? setChevron('up') : setChevron('down');
    hidden === 'hidden-actions' ? setHidden('') : setHidden('hidden-actions');
  };

  const takeAction = (a) => {
    toggleDropdown();
    navigate(a.to);
  };

  return (
    <>
      <div className="nav-items actions-dropdown-btn" onClick={toggleDropdown}>
        {user.name}
        <i className={`bi bi-chevron-${chevron}`}></i>
      </div>
      <ul className={`actions-dropdown-menu ${hidden}`}>
        {actions.map((a) => (
          <li
            className="actions-dropdown-menu-item"
            onClick={() => takeAction(a)}
          >
            {a.link}
          </li>
        ))}
      </ul>
    </>
  );
}

const userActions = {
  hospital: [{ link: 'Order Blood', to: '/order' }],
  receptionist: [{ link: 'Donate Blood', to: '/donation' }],
  system_manager: [{ link: 'Register User', to: '/register' }],
};

export default ActionsDropdown;
