import React from 'react';
import '../../main-style-file.scss';

import Main from '../main';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { whyDidYouUpdate } from "why-did-you-update";

const App = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
);

whyDidYouUpdate(React);
export default whyDidYouUpdate(App);
