import React from 'react';
import logo from './assets/logo.svg';
import search from './assets/search.svg';
import cart from './assets/cart.svg';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';

type THeader = {};

const Header: React.FC<THeader> = ({}) => {
  const itemsOne = [
    { path: '/', value: 'Home' },
    { path: '/products', value: 'Products' },
    { path: '/', value: 'Showroom' },
    { path: '/about', value: 'About Us' },
    { path: '/contact', value: 'Contact' },
  ];
  const itemsTwo = [
    { path: '/faq', value: 'FAQ' },
    { path: '/', value: 'Become A Dealer' },
    { path: '/', value: 'Find A Retail' },
  ];
  const [menuActive, setMenuActive] = React.useState(false);
  const onClickMenu = () => {
    setMenuActive(false);
  };
  return (
    <header className={s.container}>
      <nav>
        <div
          className={`${s.burger} ${menuActive && s.burgerActive}`}
          onClick={() => setMenuActive(!menuActive)}>
          <span />
        </div>
        <ul>
          {itemsOne.map((obj, index) => (
            <li key={index}>
              <Link to={obj.path}>{obj.value}</Link>
            </li>
          ))}
        </ul>
        <div className={s.logo} onClick={onClickMenu}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul>
          {itemsTwo.map((obj, index) => (
            <li key={index}>
              <Link to={obj.path}>{obj.value}</Link>
            </li>
          ))}
          <li>
            <Link to="/cart">
              <div className={s.cart}>
                <img src={cart} alt="cart" />
                <div className={s.cartCount}>1</div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={search} alt="search" />
            </Link>
          </li>
        </ul>
        <ul className={`${s.menuBurg} ${menuActive && s.menuBurgActive}`}>
          {[...itemsOne, ...itemsTwo].map((obj, index) => (
            <li key={index} onClick={onClickMenu}>
              <Link to={obj.path}>{obj.value}</Link>
            </li>
          ))}
        </ul>
        <div className={s.cartBurg} onClick={onClickMenu}>
          <Link to="/cart">
            <img src={cart} alt="cart" />
            <div className={s.cartCount}>1</div>
          </Link>
        </div>
        <div className={`${s.blurBurg} ${menuActive && s.blurBurgActive}`}></div>
      </nav>
    </header>
  );
};

export default Header;
