import React from 'react';
import About from '../../components/About/About';
import Collections from '../../components/Collections/Collections';
import s from './HomePage.module.scss';

type THome = {};

const Home: React.FC<THome> = ({}) => {
  return (
    <div className={s.container}>
      <About />
      <Collections />
    </div>
  );
};

export default Home;
