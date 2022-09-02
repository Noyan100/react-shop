import React from 'react';
import s from './Item.module.scss';

type TItem = {
  img: string;
  name: string;
  cost: number;
  sale: number;
};

const Item: React.FC<TItem> = ({ img, name, cost, sale }) => {
  return (
    <div className={s.container}>
      <div className={s.img}>
        <img src={img} alt="" />
      </div>
      <div className={s.name}>{name}</div>
      <div className={s.price}>
        <span className={s.costWithSale}>£{(cost / 100) * 40}.00</span>
        <span className={s.cost}>£{cost}.00</span>
        <span className={s.sale}>{sale}% Off</span>
      </div>
    </div>
  );
};

export default Item;
