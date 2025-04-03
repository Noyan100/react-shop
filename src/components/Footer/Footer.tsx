import React from "react";
import phone from "./assets/phone-handset.svg";
import facebook from "./assets/facebook.svg";
import instagram from "./assets/instagram.svg";
import payOne from "./assets/mastercard.svg";
import payTwo from "./assets/visa.svg";
import payThree from "./assets/google-pay.svg";
import payFour from "./assets/apple-pay.svg";
import phoneIcon from "./assets/phone.svg";
import emailIcon from "./assets/email.svg";
import logo from "./assets/logo.svg";
import s from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addCategory } from "../../redux/slices/filterSlice";

type TFooter = {};

const Footer: React.FC<TFooter> = ({}) => {
  const dispatch = useAppDispatch();
  const listOne = {
    title: "Product",
    items: [
      { value: "Sofas", path: "/products" },
      { value: "Accent", path: "/products" },
      { value: "Sectional", path: "/products" },
      { value: "Sleepers", path: "/products" },
      { value: "Chairs", path: "/products" },
      { value: "Coffee tables", path: "/products" },
    ],
  };
  const onClickCategory = (value: string) => {
    dispatch(addCategory(value));
  };
  const listTwo = {
    title: "Help",
    items: [
      { value: "О нас", path: "/about" },
      { value: "Контакты", path: "/contact" },
      { value: "FAQ", path: "/faq" },
    ],
  };
  return (
    <div className={s.container}>
      <div className={s.helpBlock}>
        <div className={s.wrapper}>
          <div className={s.title}>Могу чем-то помочь?</div>
          <div className={s.text}>
            Ваш комфорт — наш приоритет. Персональный консультант с готовностью
            ответит на все вопросы и поможет оформить заказ.
          </div>
          <div className={s.email}>Свяжитесь с нами @Meridian.com</div>
        </div>
        <div className={s.wrapper}>
          <button className={s.button}>
            <img src={phone} alt="phone" /> 1234 567890
          </button>
          <div className={s.time}>8am to 6pm, 7 days a week</div>
        </div>
      </div>
      <div className={s.main}>
        <div className={s.logoBlock}>
          <div className={s.logo}>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className={s.menuBlock}>
          <ul>
            <li className={s.title}>Head Office</li>
            <li className={s.state}>
              32 Plum St, Trenton, NJ 08638, United States
            </li>
            <li>
              <img src={phoneIcon} alt="phone" />
              1234 567890
            </li>
            <li>
              <img src={emailIcon} alt="email" />
              support@Meridian.com
            </li>
          </ul>
          <ul>
            <li className={s.title}>{listOne.title}</li>
            {listOne.items.map((obj, index) => (
              <li key={index} onClick={() => onClickCategory(obj.value)}>
                <Link to={obj.path}>{obj.value}</Link>
              </li>
            ))}
          </ul>
          <ul>
            <li className={s.title}>{listTwo.title}</li>
            {listTwo.items.map((obj, index) => (
              <li key={index}>
                <Link to={obj.path}>{obj.value}</Link>
              </li>
            ))}
          </ul>
          <ul className={s.emailBlock}>
            <li className={s.title}>Join Meridian for Exclusive Offers</li>
            <li className={s.inputemail}>
              <input type="email" placeholder="Email address" />
              <button type="submit"></button>
            </li>
            <li className={s.text}>
              Our newsletter is packed full of style ideas, new products and
              exclusive disounts. We are GDPR compliant, your information is
              secure with us.
            </li>
          </ul>
        </div>
        <div className={s.policyBlock}>
          <div className={s.policy}>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Shipping Policy</li>
            </ul>
            <div className={s.social}>
              <div className={s.facebook}>
                <img src={facebook} alt="facebook" />
              </div>
              <div className={s.instagram}>
                <img src={instagram} alt="instagram" />
              </div>
            </div>
          </div>
          <div className={s.payment}>
            <img src={payOne} alt="mastercard" />
            <img src={payTwo} alt="visa" />
            <img src={payThree} alt="google pay" />
            <img src={payFour} alt="apple pay" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
