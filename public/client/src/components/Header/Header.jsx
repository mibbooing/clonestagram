import React from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';

function Header() {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="logo">
          <img src="/assets/welcome/logo.svg" alt="로고" />
        </div>
        <nav className="navigation">
          <ul className="nav-wrapper">
            <Link to="/feed">
              <li className="nav">
                <img src="/assets/header/feed-dac.svg" alt="피드로 가기" />
              </li>
            </Link>
            <Link
              to={{
                pathname: '/profile',
                state: {
                  isFollowing: false
                }
              }}
            >
              <li className="nav">
                <img src="/assets/header/profile-dac.svg" alt="프로필로 가기" />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
