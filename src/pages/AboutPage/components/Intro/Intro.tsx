import React from 'react';
import { Link } from 'react-router-dom';
import s from './Intro.module.scss';

type TIntro = {};

const Intro: React.FC<TIntro> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.title}>Meridian Furniture</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus rhoncus montes, sem lacus,
          sed sit sed. Scelerisque aliquam justo tincidunt vitae ultricies enim eget. Et sodales
          quis odio at risus semper. Et ante in.
        </p>
        <div className={s.button}>
          <Link to="/products">See Our Collections</Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
