import React from 'react';

import { capitalize } from '../../lib';

import avatar from '../../../public/avatar.jpg';
import development from '../../../public/dev.png';
import breakOpen from '../../../public/break-open.png';
import breakClose from '../../../public/break-close.png';
import communication from '../../../public/conversation.png';
import design from '../../../public/paint-brush.png';
import web from '../../../public/web.png';

import './style.scss';

const skillsList = [
  {
    name: 'communication',
    description: 'I realize the importance of good communication. I use tools like Slack to make sure we’re always on the same page.',
    icon: communication,
  },
  {
    name: 'design',
    description: "I'm not a graphic designer, but I have an eye for good design. I'm comfortable using Photoshop, Illustrator and Sketch and can take designs from mock-up to implementation.",
    icon: design,
  },
  {
    name: 'development',
    description: 'I have a first-class degree in computer science and recognize the importance of applying proper software development techniques to the web.',
    icon: web,
  },
];

const Home = () => (
  <div className='home'>
    <div className="home__top-info">
      <div className="home__title">
        <p>Welcome to my portfolio</p>
        <div className="home__title--main">
          <p> I'm </p>
          <p className="home__title--name"> Georgiana </p>
          <p> and I'm a Front End Developer </p>
        </div>
        <p className="home__title--info"> Feel free to browse around and find out more about my work</p>
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
    <div className="home__skills">
      <div className="home__skills--content">
        {
          skillsList.map((skill) => (
            <div className="skill">
              <div className="skill__item">
                <div className="skill__item--icon"><img src={skill.icon} /></div>
                <div className="skill__item--text">
                  <p className="skill__item--title">{capitalize(skill.name)}</p>
                  <p className="skill__item--description">{skill.description}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    <div className="home__tools">
      
    </div>
  </div>
);

export default Home;
