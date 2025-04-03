import React from 'react';
import { Link } from 'react-router-dom';
import s from './Item.module.scss';

type TItem = {
  item: {
    id: string;
    name: string;
    cost: number;
    items: {
      photos: string[];
    }[];
  };
};

const Item: React.FC<TItem> = ({ item }) => {
  return (
    <div className={s.container}>
      <div className={s.img}>
        <img src={item.items[0].photos[0]} alt="" />
      </div>
      <div className={s.title}>{item.name}</div>
      <div className={s.cost}>{item.cost}.00₽</div>
      <Link to={`/products/${item.id}`}>View Details Products</Link>
    </div>
  );
};

export default Item;
