import React from 'react';
import { Link } from 'react-router-dom';
import s from './Item.module.scss';

type TItem = {
  items: { color: string; photos: string[] }[];
  name: string;
  cost: number;
  sale: number;
  id: string;
};

const Item: React.FC<TItem> = ({ id, items, name, cost, sale }) => {
  return (
    <div className={s.container}>
      <Link to={`/products/${id}`}>
        <div className={s.img}>
          <img src={items[0].photos[0]} alt="" />
        </div>
        <div className={s.name}>{name}</div>
        <div className={s.price}>
          <span className={s.costWithSale}>£{Math.floor(cost - (cost / 100) * sale)}.00</span>
          <span className={s.cost}>£{cost}.00</span>
          <span className={s.sale}>{sale}% Off</span>
        </div>
      </Link>
    </div>
  );
};

export default Item;
