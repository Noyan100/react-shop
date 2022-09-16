import React from 'react';
import s from './MadeInfo.module.scss';
import icon from './assets/icon.svg';

type TMadeInfo = {};

const MadeInfo: React.FC<TMadeInfo> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.icon}>
          <img src={icon} alt="" />
        </div>
        <div className={s.subtitle}>COMMITED TO EUROPIAN MANUFACTURING</div>
        <div className={s.title}>
          our <span>Products</span> are made with <span>HIGH</span> <span>QUALITY</span> european{' '}
          <span>FABRIC</span> and sewn by a <span>SMALL</span> team <span>CRAFTSPEOPLE</span> in{' '}
          <span>EUROPE</span>
        </div>
      </div>
      <div className={s.shadow}></div>
    </div>
  );
};

export default MadeInfo;
