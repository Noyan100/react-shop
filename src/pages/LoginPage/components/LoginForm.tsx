import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { resendVerificationEmail } from "../../../services/authService";
import styles from "./LoginForm.module.scss";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(null);
    setUnverifiedEmail(null);
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;

    try {
      setIsLoading(true);
      await resendVerificationEmail(unverifiedEmail);
      setResendSuccess(
        "Письмо с подтверждением отправлено повторно. Пожалуйста, проверьте вашу почту."
      );
      setUnverifiedEmail(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Ошибка при отправке письма подтверждения"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setUnverifiedEmail(null);
    setResendSuccess(null);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      if (err.response?.data?.code === "EMAIL_NOT_VERIFIED") {
        setUnverifiedEmail(err.response.data.email);
        setError("Email не подтвержден. Пожалуйста, проверьте вашу почту.");
      } else {
        setError(err.response?.data?.message || "Ошибка при входе");
      }
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
        <h2 className={styles.subtitle}>Вход</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

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
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
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
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <button
            type="button"
            className={styles.forgotPasswordButton}
            onClick={() => navigate("/forgot-password")}
          >
            Забыли пароль?
          </button>

          <div className={styles.divider}></div>

          {resendSuccess && (
            <div className={styles.success}>{resendSuccess}</div>
          )}
          {unverifiedEmail && (
            <button
              type="button"
              onClick={handleResendVerification}
              className={styles.resendButton}
              disabled={isLoading}
            >
              Отправить письмо подтверждения повторно
            </button>
          )}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>
        <button
          className={styles.registerButton}
          onClick={() => navigate("/register")}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
