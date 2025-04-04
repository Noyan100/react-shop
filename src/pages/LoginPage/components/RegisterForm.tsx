import React from 'react';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>техно | строй</h1>
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Регистрация</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Почта
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Введите вашу почту"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Введите ваш пароль"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Подтвердите пароль
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            placeholder="Повторите ваш пароль"
          />
        </div>

        <div className={styles.divider}></div>

        <button className={styles.registerButton}>Зарегистрироваться</button>
        <button className={styles.loginButton}>Уже есть аккаунт? Войти</button>
      </div>
    </div>
  );
};

export default RegisterForm;
