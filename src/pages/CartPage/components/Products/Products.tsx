import React from "react";
import Item from "./Item/Item";
import s from "./Products.module.scss";
import { useAppSelector } from "../../../../hooks/reduxHooks";

type TProducts = {};

const Products: React.FC<TProducts> = ({}) => {
  const items = useAppSelector((state) => state.cart.items);
  return (
    <div className={s.container}>
      <ul className={s.list}>
        <li className={s.products}>Товар</li>
        <li className={s.quantity}>Количество</li>
        <li className={s.total}>Итого</li>
      </ul>
      <div className={s.items}>
        {items.map((obj, index) => (
          <Item key={index + obj.name} item={obj} />
        ))}
      </div>
    </div>
  );
};

export default Products;
