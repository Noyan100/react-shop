import React from 'react';
import logo from './assets/logo.svg';
import cart from './assets/cart.svg';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

type THeader = {};

const Header: React.FC<THeader> = ({}) => {
  const totalCount = useAppSelector((state) => state.cart.totalCount);
  const items = useAppSelector((state) => state.cart.items);
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current === true) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    } else {
      isMounted.current = true;
    }
  }, [items]);
  const itemsOne = [
    { path: '/', value: 'Home' },
    { path: '/products', value: 'Products' },
    { path: '/about', value: 'About Us' },
  ];
  const itemsTwo = [
    { path: '/faq', value: 'FAQ' },
    { path: '/contact', value: 'Contact' },
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
                <div className={s.cartCount}>
                  <p>{totalCount}</p>
                </div>
              </div>
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
            <div className={s.cartCount}>
              <p>{totalCount}</p>
            </div>
          </Link>
        </div>
        <div className={`${s.blurBurg} ${menuActive && s.blurBurgActive}`}></div>
      </nav>
    </header>
  );
};

export default Header;
