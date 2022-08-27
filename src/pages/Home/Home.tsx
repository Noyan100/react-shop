import React from 'react';
import styles from './Home.module.scss';

type THome = {};

const Home: React.FC<THome> = ({}) => {
  return <div className={styles.container}>Home</div>;
};

export default Home;
