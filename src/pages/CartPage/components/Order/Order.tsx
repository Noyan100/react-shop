import React from 'react';
import s from './Order.module.scss';
import mastercard from './assets/mastercard.svg';
import visa from './assets/visa.svg';
import googlePay from './assets/google-pay.svg';
import applePay from './assets/apple-pay.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';

type TOrder = {};

const Order: React.FC<TOrder> = ({}) => {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const VAT = Math.ceil((totalPrice / 100) * 20);
  const [activeShipping, setActiveShipping] = React.useState(0);
  const shippings = [
    { type: 'standart', name: 'standart free shipping', cost: 0 },
    { type: 'premium', name: 'premium shipping', cost: 118 },
  ];
  const onChangeShipping = (cost: number) => {
    setActiveShipping(cost);
  };
  return (
    <div className={s.container}>
      <div className={s.title}>Order Summary</div>
      <div className={s.wrapper}>
        <div className={s.subtotal}>
          Subtotal <span className={s.price}>£{totalPrice + VAT}.00</span>
        </div>
        <div className={s.vat}>(includes £{VAT}.00 20% VAT)</div>
        <div className={s.shippings}>
          {shippings.map((obj, index) => (
            <div key={index + obj.type} className={s.shipping}>
              <input
                type="radio"
                name="shipping"
                id={obj.name + index}
                checked={obj.cost === activeShipping}
                onChange={() => onChangeShipping(obj.cost)}
              />
              <label htmlFor={obj.name + index}>
                {obj.name}
                <span className={s.cost}>£{obj.cost}.00</span>
              </label>
            </div>
          ))}
        </div>
        <div className={s.total}>
          Total <span className={s.cost}>£{totalPrice + VAT + activeShipping}.00</span>
        </div>
        <div className={s.button}>Proceed To Checkout</div>
        <ul className={s.payment}>
          <li>
            <img src={mastercard} alt="mastercard" />
          </li>
          <li>
            <img src={visa} alt="visa" />
          </li>
          <li>
            <img src={googlePay} alt="google pay" />
          </li>
          <li>
            <img src={applePay} alt="apple pay" />
          </li>
        </ul>
        <div className={s.about}>
          Discount prices will be active after entering the checkout process
        </div>
      </div>
    </div>
  );
};

export default Order;
