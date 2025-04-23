import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/authService";
import styles from "./LoginForm.module.scss";

const PasswordRecoveryForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Ошибка при отправке запроса на восстановление пароля"
      );
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
        <h2 className={styles.subtitle}>Восстановление пароля</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && (
          <div className={styles.successMessage}>
            Инструкции по восстановлению пароля отправлены на вашу почту
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Почта
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Введите вашу почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? "Отправка..." : "Отправить"}
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

export default PasswordRecoveryForm;
