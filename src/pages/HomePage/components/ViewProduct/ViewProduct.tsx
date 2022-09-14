import React from 'react';
import { Link } from 'react-router-dom';
import s from './ViewProduct.module.scss';

type TViewProduct = {
  items: { id: string; items: { photos: string[] }[] }[];
};

const ViewProduct: React.FC<TViewProduct> = ({ items }) => {
  if (!items) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.title}>Get Inspired & Find Us on Instagram</div>
      <div className={s.wrapper}>
        {items.map((obj, index) => (
          <div className={s.item} key={index}>
            <div className={s.image}>
              <img src={obj.items[0].photos[0]} alt="furniture image" />
            </div>
            <Link to={`/products/${obj.id}`} className={s.button}>
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
