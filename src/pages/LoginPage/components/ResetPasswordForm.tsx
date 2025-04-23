import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../../services/authService";
import styles from "./LoginForm.module.scss";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!token) {
      setError("Неверная ссылка для восстановления пароля");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при смене пароля");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>техно | строй</h1>
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Новый пароль</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && (
          <div className={styles.successMessage}>
            Пароль успешно изменен. Вы будете перенаправлены на страницу
            входа...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Новый пароль
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="Введите новый пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
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
              placeholder="Подтвердите новый пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? "Смена пароля..." : "Изменить пароль"}
          </button>
        </form>

        <button
          className={styles.registerButton}
          onClick={() => navigate("/login")}
        >
          Вернуться к входу
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
