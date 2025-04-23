import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/authService";
import styles from "./VerifyEmailPage.module.scss";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Токен верификации не предоставлен");
      return;
    }

    const verify = async () => {
      try {
        const response = await verifyEmail(token);
        setStatus("success");
        setMessage(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Не удалось подтвердить email. Пожалуйста, попробуйте снова."
        );
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className={styles.verifyEmailPage}>
      <div className={styles.verifyEmailContainer}>
        <h1>Подтверждение Email</h1>
        {status === "loading" && <p>Подтверждение вашего email...</p>}
        {status === "success" && (
          <div className={styles.successMessage}>
            <p>{message}</p>
            <p>Перенаправление на страницу входа...</p>
          </div>
        )}
        {status === "error" && (
          <div className={styles.errorMessage}>
            <p>{message}</p>
            <button onClick={() => navigate("/register")}>
              Вернуться к регистрации
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
