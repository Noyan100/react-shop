import React from 'react';
import s from './Item.module.scss';

type TItem = {
  item: {
    id: string;
    title: string;
    image: string;
    cost: number;
  };
};

const Item: React.FC<TItem> = ({ item }) => {
  return (
    <div className={s.container}>
      <div className={s.img}>
        <img src={item.image} alt="" />
      </div>
      <div className={s.title}>{item.title}</div>
      <div className={s.cost}>£{item.cost}.00</div>
      <button>View Details Products</button>
    </div>
  );
};

export default Item;
