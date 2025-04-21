import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { createClient } from "@supabase/supabase-js";
import s from "./Header.module.scss";
import cart from "./assets/cart.svg";

const Header: React.FC = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const totalCount = useAppSelector((state) => state.cart.totalCount);
  const items = useAppSelector((state) => state.cart.items);
  const isMounted = React.useRef(false);

  const supabase = createClient(
    "https://amuoysjxhphfkehwljev.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdW95c2p4aHBoZmtlaHdsamV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTk3MjgsImV4cCI6MjA1ODQ3NTcyOH0.tWrkEp5lGAYJyVC008wINyYz2MkdGSNmcOD4cYlcBsM"
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      isMounted.current = true;
    }
  }, [items]);

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
                <Link to={item.path}>{item.value}</Link>
              </li>
            ))}
          </ul>

          <div className={s.logo}>
            <Link to="/">ТЕХНО | СТРОЙ</Link>
          </div>

          <ul className={s.navRight}>
            {navItemsRight.map((item) => (
              <li key={item.id}>
                <Link to={item.path}>{item.value}</Link>
              </li>
            ))}
            <li className={s.cartItem}>
              <Link to="/cart">
                <img src={cart} alt="Корзина" className={s.cartIcon} />
                {totalCount > 0 && (
                  <span className={s.cartCount}>{totalCount}</span>
                )}
              </Link>
            </li>
            <li className={s.authItem}>
              {session ? (
                <div className={s.authContainer}>
                  <span className={s.userEmail}>{user?.email}</span>
                  <button onClick={handleLogout} className={s.logoutButton}>
                    Выйти
                  </button>
                </div>
              ) : (
                <div className={s.authContainer}>
                  <Link to="/login" className={s.loginButton}>
                    Войти
                  </Link>
                  <Link to="/profile" className={s.profileButton}>
                    Профиль
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
        </div>
      </div>
    </header>
  );
};

export default Header;
