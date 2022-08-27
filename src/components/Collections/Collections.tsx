import React from 'react';
import { Link } from 'react-router-dom';
import s from './Collections.module.scss';

type TCollections = { items: { value: string; image: string; path: string; size: number }[] };

const Collections: React.FC<TCollections> = ({ items }) => {
  return (
    <div className={s.container}>
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
  );
};

export default Collections;
