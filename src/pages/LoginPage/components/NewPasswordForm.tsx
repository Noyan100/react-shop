import React from 'react';
import styles from './NewPasswordForm.module.scss';

const NewPasswordForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>техно | строй</h1>
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Установка нового пароля</h2>

        <p className={styles.description}>
          Придумайте новый пароль и повторите его для подтверждения
        </p>

        <div className={styles.inputGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            Новый пароль
          </label>
          <input
            type="password"
            id="newPassword"
            className={styles.input}
            placeholder="Введите новый пароль"
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
            placeholder="Повторите новый пароль"
          />
        </div>

        <button className={styles.saveButton}>Сохранить новый пароль</button>
      </div>
    </div>
  );
};

export default NewPasswordForm;
