import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../homepage';
import Projects from '../projects';

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/projects' component={Projects}></Route>
  </Switch>
);

export default Main;
