import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userActions from '../../data/userActions';
import './ActionsDropdown.css';

function ActionsDropdown({ user }) {
  const navigate = useNavigate();
  const [chevron, setChevron] = useState('down');
  const [hidden, setHidden] = useState('hidden-actions');
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (user.email) setActions(userActions[user.type]);
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
        {actions.map((a, i) => (
          <li
            key={i}
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

export default ActionsDropdown;
