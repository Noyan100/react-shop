import React from 'react';
import { Link } from 'react-router-dom';
import s from './Collections.module.scss';

type TCollections = {
  title?: string;
  subtitle?: string;
  items: { value: string; image: string; path: string; size: number }[];
};

const Collections: React.FC<TCollections> = ({ title = '', subtitle = '', items }) => {
  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>
      <div className={s.subtitle}>{subtitle}</div>
      <div className={s.grid}>
        {items.map((obj, index) => (
          <div key={index} className={`${obj.size === 2 && s.sizeTwo} ${s.item}`}>
            <Link to={obj.path}>
              <div className={s.itemWrapper}>
                <div className={s.itemImg}>
                  <img src={obj.image} alt="" />
                </div>
                <div className={s.title}>{obj.value}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
