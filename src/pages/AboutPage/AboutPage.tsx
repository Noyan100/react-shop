import React from 'react';
import s from './AboutPage.module.scss';
import About from './components/About/About';
import Intro from './components/Intro/Intro';

type TAboutPage = {};

const AboutPage: React.FC<TAboutPage> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.intro}>
        <Intro />
      </div>
      <div className={s.about}>
        <About />
      </div>
    </div>
  );
};

export default AboutPage;
