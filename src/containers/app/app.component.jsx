import React, { Component } from 'react';
import '../../style.scss';

import Main from '../main';
import Navigation from '../../components/navigation';

const App = () => (
  <div>
    <h1>My portofolio</h1>
    <Navigation />
    <Main />
  </div>
);

export default App;
