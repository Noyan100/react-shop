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

type TProduct = {};

const Product: React.FC<TProduct> = ({}) => {
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
  const carousel = [image, image, image, image, image, image];
  const colors = ['#25282A', '#F0E9DE', '#AAADAE', '#016262', '#F8796B'];
  const [color, setColor] = React.useState(colors[0]);
  const payment = [mastercard, visa, googlePay, applePay];
  return (
    <div className={s.container}>
      <div className={s.swiper}>
        <ThumbCarousel items={carousel} />
      </div>
      <div className={s.info}>
        <div className={s.name}>Alma Velvet Armless</div>
        <div className={s.cost}>
          <span className={s.costWithSale}>£1,500.00</span>
          <span className={s.cost}>£2,500.00</span>
          <span className={s.sale}>40% Off</span>
        </div>
        <div className={s.stars}>
          <StarsRating amount={5} />
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
