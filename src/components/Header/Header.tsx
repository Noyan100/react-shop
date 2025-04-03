import React from "react";
import logo from "./assets/logo.svg";
import cart from "./assets/cart.svg";
import s from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

const Header: React.FC = () => {
  const totalCount = useAppSelector((state) => state.cart.totalCount);
  const items = useAppSelector((state) => state.cart.items);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    } else {
      isMounted.current = true;
    }
  }, [items]);

  type NavItem = {
    path: string;
    value: string;
    id: string; // Добавляем уникальный идентификатор
  };

  const itemsOne: NavItem[] = [
    { path: "/", value: "Домой", id: "home" },
    { path: "/products", value: "Товары", id: "products" },
    { path: "/about", value: "О нас", id: "about" },
  ];

  const itemsTwo: NavItem[] = [
    { path: "/faq", value: "FAQ", id: "faq" },
    { path: "/contact", value: "Контакты", id: "contact" },
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
          onClick={() => setMenuActive(!menuActive)}
          aria-label="Toggle menu"
        >
          <span />
        </div>
        <ul>
          {itemsOne.map((obj) => (
            <li key={obj.id}>
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
          {itemsTwo.map((obj) => (
            <li key={obj.id}>
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
          {[...itemsOne, ...itemsTwo].map((obj) => (
            <li key={obj.id} onClick={onClickMenu}>
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
        <div
          className={`${s.blurBurg} ${menuActive && s.blurBurgActive}`}
        ></div>
      </nav>
    </header>
  );
};

export default Header;
