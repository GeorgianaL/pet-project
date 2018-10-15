import React from 'react';
import { Switch, Route } from 'react-router-dom';

import avatar from '../../../public/avatar.jpg';
import development from '../../../public/development.png';
import D3Projects from '../d3projects';

import './style.scss';

const Home = () => (
  <div className='home'>
    <div className="home__title">
      <h1>Welcome to my portfolio website</h1>
      <p> Feel free to browse around and learn more about me</p>
      <img src={avatar} alt="avatar" className="home__title--photo"/>
    </div>
    <div className="home__content">
      <div className="home__content--photo">
        <img src={development} alt="development" />
      </div>
    </div>
  </div>
);

const About = () => (
  <div className='about'>
    <h1>About Me</h1>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/d3projects' component={D3Projects}></Route>
  </Switch>
);

export default Main;
