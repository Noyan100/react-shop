import React from "react";
import StarsRating from "../../../../components/StarsRating/StarsRating";
import Tab from "../../../../components/Tab/Tab";
import ThumbCarousel from "../../../../components/ThumbCarousel/ThumbCarousel";
import s from "./Product.module.scss";
import applePay from "./assets/apple-pay.svg";
import googlePay from "./assets/google-pay.svg";
import mastercard from "./assets/mastercard.svg";
import visa from "./assets/visa.svg";
import guarantee from "./assets/guarantee.svg";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { addItem } from "../../../../redux/slices/cartSlice";
import { TItem } from "../../../../redux/types/types";

type TProduct = { item: TItem };

const Product: React.FC<TProduct> = ({ item }) => {
  const dispatch = useAppDispatch();
  const tab = [
    {
      title: "Самовывоз",
      subtitle: "Стоимость доставки: Бесплатно",
      text: "Вы можете бесплатно забрать свой заказ по адресу: Красноярск, ул. Академика Киренского, 26, корп. 1. Наш пункт самовывоза работает с понедельника по пятницу с 9:00 до 20:00, в субботу и воскресенье с 10:00 до 18:00. После подтверждения заказа мы соберем его для вас в течение 2 часов. При получении необходимо будет назвать номер заказа и предъявить документ, удостоверяющий личность. Перед тем как забрать товар, вы сможете проверить его комплектность и состояние. Для вашего удобства предусмотрена бесплатная парковка на территории на 30 минут. Если вам потребуется помощь с погрузкой, наши сотрудники будут рады вам помочь.",
    },
    {
      title: "Доставка курьером",
      subtitle: "Стоимость доставки: 118 ₽",
      text: "Мы предлагаем удобную и недорогую доставку ваших покупок по фиксированной цене всего 118 рублей, независимо от стоимости заказа. Эта сумма включает базовую услугу доставки по указанному адресу в пределах города. Наш курьер обязательно свяжется с вами за 1-2 часа до прибытия, чтобы согласовать точное время визита. При получении вы сможете внимательно осмотреть товар перед оплатой.",
    },
  ];
  const { id, items, reviews, name, cost, sale } = item;
  const colors = [...items.map((obj) => obj.color)];
  const [color, setColor] = React.useState(colors[0]);
  const carousel = items.find((obj) => obj.color === color).photos;
  const payment = [mastercard, visa, googlePay, applePay];
  const stars = Math.ceil(
    reviews.reduce((sum, current) => sum + current.stars, 0) / reviews.length
  );

  const onAddItem = () => {
    const cartItem = { ...item, cartid: id + color, count: 1 };
    dispatch(addItem(cartItem));
  };
  return (
    <div className={s.container}>
      <div className={s.swiper}>
        <ThumbCarousel items={carousel} />
      </div>
      <div className={s.info}>
        <div className={s.name}>{name}</div>
        <div className={s.cost}>
          <span className={s.costWithSale}>
            {Math.floor(cost - (cost / 100) * sale)}.00₽
          </span>
          <span className={s.cost}>{cost}.00₽</span>
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
              onClick={() => setColor(value)}
            ></li>
          ))}
        </ul>
        <button className={s.button} onClick={onAddItem}>
          Добавить в корзину
        </button>
        <div className={s.guarantee}>
          Гарантированный Безопасная
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
