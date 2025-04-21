import React from 'react';
import styles from './PasswordRecoveryForm.module.scss';

const PasswordRecoveryForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>техно | строй</h1>
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Восстановление пароля</h2>

        <p className={styles.description}>
          Введите email, указанный при регистрации, и мы вышлем инструкции для восстановления пароля
        </p>

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

        <div className={styles.divider}></div>

        <button className={styles.recoveryButton}>Отправить инструкции</button>
        <button className={styles.backButton}>Вернуться к входу</button>
      </div>
    </div>
  );
};

export default PasswordRecoveryForm;
