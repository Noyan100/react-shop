import React from 'react';
import s from './Other.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TItem } from '../../../../redux/types/types';
import { useAppSelector } from '../../../../hooks/reduxHooks';

type TOther = {};

const Other: React.FC<TOther> = () => {
  const items = useAppSelector((state) => state.items.items);
  return (
    <div className={s.container}>
      <div className={s.title}>Shop Our Other Popular Sets</div>
      <div className={s.items}>
        {!items ? (
          <div>Загрузка</div>
        ) : (
          items.map((obj, index) => (
            <div className={s.item} key={obj.id + index}>
              <div className={s.img}>
                <img src={obj.items[0].photos[0]} alt={obj.name} />
              </div>
              <div className={s.name}>{obj.name}</div>
              <div className={s.cost}>£{obj.cost}.00</div>
              <Link to={`/products/${obj.id}`}>View Set</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Other;
