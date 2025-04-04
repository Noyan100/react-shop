import React from "react";
import Path from "../../components/Path/Path";
import { useAppSelector } from "../../hooks/reduxHooks";
import s from "./CartPage.module.scss";
import Order from "./components/Order/Order";
import Products from "./components/Products/Products";

type TCartPage = {};

const CartPage: React.FC<TCartPage> = ({}) => {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const totalCount = useAppSelector((state) => state.cart.totalCount);
  return (
    <div className={s.container}>
      <Path />

      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.titleBlock}>
            <div className={s.title}>Корзина</div>
            <div className={s.amount}>{totalCount} Товара/ов</div>
          </div>
          <div className={s.products}>
            <Products />
          </div>
        </div>
        <div className={s.order}>
          <Order />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
