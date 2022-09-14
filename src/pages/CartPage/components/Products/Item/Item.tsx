import React from 'react';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import { minusItem, plusItem, removeItem } from '../../../../../redux/slices/cartSlice';
import { TCartItem } from '../../../../../redux/types/types';
import s from './Item.module.scss';

type TItem = { item: TCartItem };

const Item: React.FC<TItem> = ({ item }) => {
  const { name, cost, count, items, cartid } = item;
  const img = item.items.find((obj) => obj.color.split('#')[1] === cartid.split('#')[1]).photos[0];
  const dispatch = useAppDispatch();
  const onClickPlus = () => {
    dispatch(plusItem(item));
  };
  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(item));
    }
  };
  const onClickRemove = () => {
    if (window.confirm('Ты действительно хочешь удалить товар?')) {
      dispatch(removeItem(item));
    }
  };
  return (
    <div className={s.container}>
      <div className={s.firstBlock}>
        <div className={s.img}>
          <img src={img} alt="product" />
        </div>
        <div className={s.name}>{name}</div>
      </div>
      <div className={s.secondBlock}>
        <div
          className={`${s.minus} ${count === 1 ? s.minusNotActive : undefined}`}
          onClick={onClickMinus}>
          -
        </div>
        <div className={s.amount}>{count}</div>
        <div className={s.plus} onClick={onClickPlus}>
          +
        </div>
      </div>
      <div className={s.thirdBlock}>
        <div className={s.cost}>£{cost * count}.00</div>
      </div>
      <div className={s.fourthBlock}>
        <span className={s.cross} onClick={onClickRemove}></span>
      </div>
    </div>
  );
};

export default Item;
