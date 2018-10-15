import React from 'react';

import avatar from '../../../public/avatar.jpg';
import development from '../../../public/dev.png';
import breakOpen from '../../../public/break-open.png';
import breakClose from '../../../public/break-close.png';

import './style.scss';

const Home = () => (
  <div className='home'>
    <div className="home__top-info">
      <div className="home__title">
        <h1>Welcome to my portfolio website</h1>
        <div className="home__title--main">
          <h3> I'm </h3>
          <h3 className="home__title--name"> Georgiana </h3>
          <h3> and I'm a Front End Developer </h3>
        </div>
        <h4> Feel free to browse around and find out more about my work</h4>
      </div>
      <div className="home__avatar">
        <img src={avatar} alt="avatar" />
      </div>
    </div>
    <div className="home__content">
      <img src={breakOpen} className="brackets" />
      <div className="home__content--photo">
        <img src={development} alt="development" className="development"/>
      </div>
      <img src={breakClose} className="brackets" />
    </div>
  </div>
);

export default Home;
