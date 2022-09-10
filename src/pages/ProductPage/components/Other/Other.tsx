import React from 'react';
import s from './Other.module.scss';
import temp from './assets/temp.jpg';
import { Link } from 'react-router-dom';

type TOther = {};

const Other: React.FC<TOther> = ({}) => {
  const items = [
    { id: '0', img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
    { id: '1', img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
    { id: '2', img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
    { id: '3', img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
  ];
  return (
    <div className={s.container}>
      <div className={s.title}>Shop Our Other Popular Sets</div>
      <div className={s.items}>
        {items.map((obj, index) => (
          <div className={s.item} key={obj.id + index}>
            <div className={s.img}>
              <img src={obj.img} alt={obj.name} />
            </div>
            <div className={s.name}>{obj.name}</div>
            <div className={s.cost}>£{obj.cost}</div>
            <button className={s.button}>
              <Link to={`/products/${obj.id}`}>View Set</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Other;
