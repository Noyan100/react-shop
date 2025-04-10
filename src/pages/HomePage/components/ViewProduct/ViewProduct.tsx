import React from "react";
import { Link } from "react-router-dom";
import s from "./ViewProduct.module.scss";

type TViewProduct = {
  items: { id: string; items: { photos: string[] }[] }[];
};

const ViewProduct: React.FC<TViewProduct> = ({ items }) => {
  return (
    <div className={s.container}>
      <div className={s.title}>
        Тут рождаются крутые идеи — присоединяйтесь!
      </div>
      <div className={s.wrapper}>
        {items.map((obj, index) => (
          <div className={s.item} key={index}>
            <div className={s.image}>
              <img src={obj.items[0].photos[0]} alt="furniture image" />
            </div>
            <Link to={`/products/${obj.id}`} className={s.button}>
              О товаре
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
