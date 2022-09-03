import React from 'react';
import Item from './Item/Item';
import s from './Products.module.scss';
import item from './assets/item.svg';

type TProducts = {};

const Products: React.FC<TProducts> = ({}) => {
  const items = [
    { img: item, name: 'Serene Linen Deluxe Cloud', amount: 3, cost: 215 },
    { img: item, name: 'Serene Linen Deluxe Cloud', amount: 3, cost: 215 },
  ];
  return (
    <div className={s.container}>
      <ul className={s.list}>
        <li className={s.products}>Products</li>
        <li className={s.quantity}>Quantity</li>
        <li className={s.total}>Total</li>
      </ul>
      <div className={s.items}>
        {items.map((obj, index) => (
          <Item key={index + obj.name} {...{ ...obj }} />
        ))}
      </div>
    </div>
  );
};

export default Products;
