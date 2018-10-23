import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.scss';

const Navigation = () => (
  <nav>
    <ul className="navigation">
      <li className="navigation__item">
        <NavLink className="navigation__item--link" exact to='/'>
          Home
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink className="navigation__item--link" exact to='/projects'>
          Projects
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
