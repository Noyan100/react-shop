import React from 'react';
import s from './ViewProduct.module.scss';
import productOne from './assets/product-one.svg';
import productTwo from './assets/product-two.svg';
import productThree from './assets/product-three.svg';
import productFour from './assets/product-four.svg';

type TViewProduct = {};

const ViewProduct: React.FC<TViewProduct> = ({}) => {
  const items = [
    { img: productOne, path: '/' },
    { img: productTwo, path: '/' },
    { img: productThree, path: '/' },
    { img: productFour, path: '/' },
  ];
  return (
    <div className={s.container}>
      <div className={s.title}>Get Inspired & Find Us on Instagram</div>
      <div className={s.wrapper}>
        {items.map((obj, index) => (
          <div className={s.item} key={index}>
            <div className={s.image}>
              <img src={obj.img} alt="" />
            </div>
            <button className={s.button}>View Product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
