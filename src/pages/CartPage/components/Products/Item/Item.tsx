import React from 'react';
import s from './Item.module.scss';

type TItem = { img: string; name: string; amount: number; cost: number };

const Item: React.FC<TItem> = ({ img, name, amount, cost }) => {
  return (
    <div className={s.container}>
      <div className={s.firstBlock}>
        <div className={s.img}>
          <img src={img} alt="product" />
        </div>
        <div className={s.name}>{name}</div>
      </div>
      <div className={s.secondBlock}>
        <div className={s.minus}>-</div>
        <div className={s.amount}>{amount}</div>
        <div className={s.plus}>+</div>
      </div>
      <div className={s.thirdBlock}>
        <div className={s.cost}>£{cost}.00</div>
      </div>
      <div className={s.fourthBlock}>
        <span className={s.cross}></span>
      </div>
    </div>
  );
};

export default Item;
