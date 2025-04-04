import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./Path.module.scss";

type TPath = {};

const Path: React.FC<TPath> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Функция для преобразования пути в читаемое название
  const getPageName = (path: string) => {
    const pathParts = path.split("/").filter(Boolean);

    if (pathParts[0] === "cart") {
      return "Корзина";
    }
    if (pathParts[0] === "products") {
      return "Каталог";
    }
  };

  return (
    <div className={s.container}>
      <span className={s.home} onClick={() => navigate("/")}>
        Домой
      </span>
      <span> / </span>
      <span>{getPageName(location.pathname)}</span>
    </div>
  );
};

export default Path;
