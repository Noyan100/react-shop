import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.scss";

interface RegisterFormData {
  email: string;
  password: string;
  username: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    if (formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
      setError("Пароль должен содержать только латинские буквы и цифры");
      return false;
    }
    if (!/[a-zA-Z]/.test(formData.password)) {
      setError("Пароль должен содержать хотя бы одну латинскую букву");
      return false;
    }
    if (!/\d/.test(formData.password)) {
      setError("Пароль должен содержать хотя бы одну цифру");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await register(
        formData.email,
        formData.password,
        formData.username
      );
      setSuccess(
        "Регистрация успешна! Пожалуйста, проверьте вашу почту для подтверждения аккаунта."
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Ошибка при регистрации. Пожалуйста, попробуйте снова."
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
        <h2 className={styles.subtitle}>Регистрация</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

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
            <label htmlFor="username" className={styles.label}>
              Имя пользователя (необязательно)
            </label>
            <input
              type="text"
              id="username"
              className={styles.input}
              placeholder="Введите имя пользователя"
              value={formData.username}
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

          <div className={styles.divider}></div>

          <button
            type="submit"
            className={styles.registerButton}
            disabled={isLoading}
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <button
          className={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Уже есть аккаунт? Войти
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
