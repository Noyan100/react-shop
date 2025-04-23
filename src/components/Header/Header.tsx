import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useAuth } from "../../context/AuthContext";
import s from "./Header.module.scss";
import cart from "./assets/cart.svg";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuActive, setMenuActive] = useState(false);
  const totalCount = useAppSelector((state) => state.cart.totalCount);
  const items = useAppSelector((state) => state.cart.items);
  const isMounted = React.useRef(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      isMounted.current = true;
    }
  }, [items]);

  const handleLogout = () => {
    logout();
  };

  type NavItem = {
    path: string;
    value: string;
    id: string;
  };

  const navItemsLeft: NavItem[] = [
    { path: "/", value: "Домой", id: "home" },
    { path: "/products", value: "Товары", id: "products" },
    { path: "/about", value: "О нас", id: "about" },
  ];

  const navItemsRight: NavItem[] = [
    { path: "/faq", value: "FAQ", id: "faq" },
    { path: "/contact", value: "Контакты", id: "contact" },
  ];

  const onClickMenu = () => {
    setMenuActive(false);
    scrollToTop();
  };

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.burger} onClick={() => setMenuActive(!menuActive)}>
          <span className={`${s.burgerLine} ${menuActive && s.burgerActive}`} />
        </div>

        <nav className={s.nav}>
          <ul className={s.navLeft}>
            {navItemsLeft.map((item) => (
              <li key={item.id}>
                <Link to={item.path} onClick={scrollToTop}>
                  {item.value}
                </Link>
              </li>
            ))}
          </ul>

          <div className={s.logo}>
            <Link to="/" onClick={scrollToTop}>
              ТЕХНО | СТРОЙ
            </Link>
          </div>

          <ul className={s.navRight}>
            {navItemsRight.map((item) => (
              <li key={item.id}>
                <Link to={item.path} onClick={scrollToTop}>
                  {item.value}
                </Link>
              </li>
            ))}
            <li className={s.cartItem}>
              <Link to="/cart" onClick={scrollToTop}>
                <img src={cart} alt="Корзина" className={s.cartIcon} />
                {totalCount > 0 && (
                  <span className={s.cartCount}>{totalCount}</span>
                )}
              </Link>
            </li>
            <li className={s.authItem}>
              {user ? (
                <div className={s.authContainer}>
                  <span className={s.userEmail}>{user.email}</span>
                  <Link
                    to="/profile"
                    className={s.profileButton}
                    onClick={scrollToTop}
                  >
                    Профиль
                  </Link>
                  <button onClick={handleLogout} className={s.logoutButton}>
                    Выйти
                  </button>
                </div>
              ) : (
                <div className={s.authContainer}>
                  <Link
                    to="/login"
                    className={s.loginButton}
                    onClick={scrollToTop}
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className={s.registerButton}
                    onClick={scrollToTop}
                  >
                    Регистрация
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Мобильное меню */}
        <div className={`${s.mobileMenu} ${menuActive && s.mobileMenuActive}`}>
          {[...navItemsLeft, ...navItemsRight].map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={s.mobileMenuItem}
              onClick={onClickMenu}
            >
              {item.value}
            </Link>
          ))}
          <Link to="/cart" className={s.mobileMenuItem} onClick={onClickMenu}>
            Корзина ({totalCount})
          </Link>
          {user ? (
            <>
              <div className={s.mobileAuthItem}>
                <span className={s.mobileUserEmail}>{user.email}</span>
                <Link
                  to="/profile"
                  className={s.mobileProfileButton}
                  onClick={onClickMenu}
                >
                  Профиль
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    onClickMenu();
                  }}
                  className={s.mobileLogoutButton}
                >
                  Выйти
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={s.mobileMenuItem}
                onClick={onClickMenu}
              >
                Войти
              </Link>
              <Link
                to="/register"
                className={s.mobileMenuItem}
                onClick={onClickMenu}
              >
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
