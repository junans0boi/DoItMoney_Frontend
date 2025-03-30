// /src/components/BottomNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/BottomNav.css';

// FontAwesome 아이콘 import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faWallet,
  faFileInvoiceDollar,
  faChartLine,
  faEllipsisH, // <-- faEllipsisH를 대신 사용
} from '@fortawesome/free-solid-svg-icons';

const BottomNav = () => {
  return (
    <footer className="bottom-nav">
      <Link to="/" className="nav-item">
        <FontAwesomeIcon icon={faHome} className="nav-icon" />
        <span>홈</span>
      </Link>

      <Link to="/asset" className="nav-item">
        <FontAwesomeIcon icon={faWallet} className="nav-icon" />
        <span>자산</span>
      </Link>

      <Link to="/transaction" className="nav-item">
        <FontAwesomeIcon icon={faFileInvoiceDollar} className="nav-icon" />
        <span>가계부</span>
      </Link>

      <Link to="/transaction" className="nav-item">
        <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
        <span>차트</span>
      </Link>

      <Link to="/profile" className="nav-item">
        <FontAwesomeIcon icon={faEllipsisH} className="nav-icon" />
        <span>더보기</span>
      </Link>
    </footer>
  );
};

export default BottomNav;