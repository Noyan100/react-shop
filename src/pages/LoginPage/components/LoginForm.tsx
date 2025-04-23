import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError("Пожалуйста, введите email");
      return false;
    }
    if (!formData.password) {
      setError("Пожалуйста, введите пароль");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/"); // Redirect to home page after successful login
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Ошибка при входе. Пожалуйста, попробуйте снова."
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
