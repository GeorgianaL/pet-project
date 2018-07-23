import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.style.scss';

const Navigation = () => (
  <nav>
    <ul className="navigation">
      <li><NavLink className="navigation__link" exact to='/about'>About</NavLink></li>
      <li><NavLink className="navigation__link" exact to='/'>Home</NavLink></li>
      <li><NavLink className="navigation__link" exact to='/contact'>Contact</NavLink></li>
    </ul>
  </nav>
);

export default Navigation;
