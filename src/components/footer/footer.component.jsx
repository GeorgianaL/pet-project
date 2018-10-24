import React from 'react';
import linkedin from '../../../public/linkedin.png';

import './style.scss';

const Footer = () => (
  <div className="footer">
    <div className="footer__contact">
      <p className="footer__contact--title">Contact</p>
      <div className="footer__contact--main">
        <p>Have a question or want to work together?</p>
        <div className="social-media">
          <p style={{marginRight: 10}}>Leave me a message on my</p>
          <a href="https://www.linkedin.com/in/georgiana-lingurariu-6385b5102/"><img src={linkedin} alt="linkedin__link" /></a>
          <p style={{marginLeft: 10}}>profile.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
