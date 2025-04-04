import React, { useEffect, useState } from 'react';
import logo from './assets/logo.svg';
import cart from './assets/cart.svg';
import login from './assets/login.svg';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { createClient } from '@supabase/supabase-js';

const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  const totalCount = useAppSelector((state) => state.cart.totalCount);
  const items = useAppSelector((state) => state.cart.items);
  const isMounted = React.useRef(false);
  const supabase = createClient(
    'https://amuoysjxhphfkehwljev.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdW95c2p4aHBoZmtlaHdsamV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTk3MjgsImV4cCI6MjA1ODQ3NTcyOH0.tWrkEp5lGAYJyVC008wINyYz2MkdGSNmcOD4cYlcBsM',
  );
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Получаем сессию и сразу обновляем пользователя
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null); // Используем пользователя из сессии
    });

    // Подписываемся на изменения аутентификации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null); // Обновляем пользователя из новой сессии
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
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
    { path: '/', value: 'Домой', id: 'home' },
    { path: '/products', value: 'Товары', id: 'products' },
    { path: '/about', value: 'О нас', id: 'about' },
  ];

  const itemsTwo: NavItem[] = [
    { path: '/faq', value: 'FAQ', id: 'faq' },
    { path: '/contact', value: 'Контакты', id: 'contact' },
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
          aria-label="Toggle menu">
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
            <div>ТЕХНО | СТРОЙ</div>
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
          <li>
            <Link to="/login">
              <div className={s.login}>
                {session ? (
                  <form className="flex items-center gap-2">
                    <p>{user.email}</p>
                    <button onClick={handleLogout}>Выйти</button>
                  </form>
                ) : (
                  <div>
                    <button className={s.button}>Войти</button>
                    <button className={s.profile}>Профиль</button>
                  </div>
                )}
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
        <div className={`${s.blurBurg} ${menuActive && s.blurBurgActive}`}></div>
      </nav>
    </header>
  );
};

export default Header;
