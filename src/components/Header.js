// /src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

/* FontAwesome 관련 import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header-container">

      <div className="nav-bar">
        <div className="left">
          <Link to="/">
            <img 
              src="/Logo.png" 
              alt="logo" 
              className="logo" 
            />
          </Link>
        </div>

        <div className="center">
          DoItMoney
        </div>

        <div className="right">
          {/* FontAwesomeIcon 컴포넌트 사용 */}
          <Link to="/chatbot" style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={faBell} className="icon" />
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;