import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../homepage';
import About from '../about';
import D3Projects from '../d3projects';

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/d3projects' component={D3Projects}></Route>
  </Switch>
);

export default Main;
