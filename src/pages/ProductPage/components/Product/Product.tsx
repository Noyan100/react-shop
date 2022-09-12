import React from 'react';
import StarsRating from '../../../../components/StarsRating/StarsRating';
import Tab from '../../../../components/Tab/Tab';
import ThumbCarousel from '../../../../components/ThumbCarousel/ThumbCarousel';
import s from './Product.module.scss';
import image from './assets/img.svg';
import applePay from './assets/apple-pay.svg';
import googlePay from './assets/google-pay.svg';
import mastercard from './assets/mastercard.svg';
import visa from './assets/visa.svg';
import guarantee from './assets/guarantee.svg';

type TProduct = {
  name: string;
  cost: number;
  sale: number;
  items: {
    color: string;
    photos: string[];
  }[];
  reviews: {
    stars: number;
  }[];
};

const Product: React.FC<TProduct> = ({ name, cost, sale, reviews, items }) => {
  const tab = [
    {
      title: 'Delivery',
      subtitle: 'Premium Delivery',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam amet justo mi pharetra, consectetur facilisis. Velit est proin orci tristique nunc varius. Id consectetur nibh at aliquet habitant proin volutpat adipiscing nisl. Facilisi donec tellus aliquet sed at non amet, massa.',
    },
    {
      title: 'Delivery1',
      subtitle: 'Premium Delivery1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam amet justo mi pharetra, consectetur facilisis. Velit est proin orci tristique nunc varius. Id consectetur nibh at aliquet habitant proin volutpat adipiscing nisl. Facilisi donec tellus aliquet sed at non amet, massa.',
    },
    {
      title: 'Delivery2',
      subtitle: 'Premium Delivery2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam amet justo mi pharetra, consectetur facilisis. Velit est proin orci tristique nunc varius. Id consectetur nibh at aliquet habitant proin volutpat adipiscing nisl. Facilisi donec tellus aliquet sed at non amet, massa.',
    },
  ];
  const colors = [...items.map((obj) => obj.color)];
  const [color, setColor] = React.useState(colors[0]);
  const carousel = items.find((obj) => obj.color === color).photos;
  const payment = [mastercard, visa, googlePay, applePay];
  const stars = Math.ceil(
    reviews.reduce((sum, current) => sum + current.stars, 0) / reviews.length,
  );
  return (
    <div className={s.container}>
      <div className={s.swiper}>
        <ThumbCarousel items={carousel} />
      </div>
      <div className={s.info}>
        <div className={s.name}>{name}</div>
        <div className={s.cost}>
          <span className={s.costWithSale}>£{Math.floor(cost - (cost / 100) * sale)}.00</span>
          <span className={s.cost}>£{cost}.00</span>
          <span className={s.sale}>{sale}% Off</span>
        </div>
        <div className={s.stars}>
          <StarsRating amount={stars} />
        </div>
        <ul className={s.colors}>
          {colors.map((value) => (
            <li
              key={value}
              style={{ background: value }}
              className={color === value ? s.activeColor : undefined}
              onClick={() => setColor(value)}></li>
          ))}
        </ul>
        <button className={s.button}>Add To Cart</button>
        <div className={s.guarantee}>
          Guaranteed Safe Checkout
          <img src={guarantee} alt="guarantee" />
        </div>
        <ul className={s.payment}>
          {payment.map((value) => (
            <li key={value}>
              <img src={value} alt="payment" />
            </li>
          ))}
        </ul>
        <div className={s.about}>
          <Tab items={tab} />
        </div>
      </div>
    </div>
  );
};

export default Product;
