import React from 'react';

import Navigation from '../navigation';

import './header.scss';

const Header = () => (
  <div className="header">
    <p className="header__title">My portofolio</p>
    <Navigation />
  </div>
);

export default Header;
