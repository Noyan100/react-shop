import React from 'react';
import { Link } from 'react-router-dom';
import s from './Intro.module.scss';

type TIntro = {};

const Intro: React.FC<TIntro> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <span>MODERN, CONTEMPORARY</span>
        <h1>OUTDOOR FURNITURE</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper eget ultrices gravida
          gravida. Suspendisse pharetra quis eros facilisi.
        </p>
        <button>
          <Link to="/collection">Shop Collection</Link>
        </button>
      </div>
    </div>
  );
};

export default Intro;
