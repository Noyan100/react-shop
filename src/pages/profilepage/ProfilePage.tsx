import React, { useEffect, useState } from "react";
import { getMe } from "../../services/authService";
import { User } from "../../models/User";
import "./components/styles/ProfilePage.scss";
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
    return <div className="profile-page">Загрузка...</div>;
  }

  if (error) {
    return <div className="profile-page">{error}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Профиль пользователя</h1>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            <div className="info-item">
              <span className="label">Имя:</span>
              <span className="value">{user?.username || "Не указано"}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user?.email || "Не указан"}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="change-password-button"
              onClick={() => navigate("/profile/change-password")}
            >
              Изменить пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
