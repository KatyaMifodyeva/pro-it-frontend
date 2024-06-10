import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/logout';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
  };

  return (
    <div className="navbar">
      <div className="navbar__brand"> App Name</div>
      <div className="navbar__user">
        <span className="navbar__user-icon">Icon</span>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
};

export default NavBar;
