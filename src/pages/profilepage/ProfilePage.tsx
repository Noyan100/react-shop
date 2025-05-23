import React, { useEffect, useState } from "react";
import { getMe } from "../../services/authService";
import { User } from "../../models/User";
import styles from "./ProfilePage.module.scss";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        setError("Не удалось загрузить данные пользователя");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Профиль пользователя</h1>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Имя:</span>
            <span className={styles.infoValue}>
              {user?.username || "Не указано"}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email:</span>
            <span className={styles.infoValue}>
              {user?.email || "Не указан"}
            </span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <button
          className={styles.button}
          onClick={() => navigate("/profile/change-password")}
        >
          Изменить пароль
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
