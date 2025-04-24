import React from "react";
import StarsRating from "../../../../../components/StarsRating/StarsRating";
import s from "./Item.module.scss";
import { useAuth } from "../../../../../context/AuthContext";
import api from "../../../../../services/api";

type TItem = {
  name: string;
  title: string;
  text: string;
  stars: number;
  date: number;
  productId: string;
  index: number;
};

const Item: React.FC<TItem> = ({
  name,
  title,
  text,
  stars,
  date,
  productId,
  index,
}) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
      try {
        await api.delete(`/products/${productId}/reviews/${index}`);
        window.location.reload(); // Refresh to update the reviews list
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Ошибка при удалении отзыва!");
      }
    }
  };

  return (
    <div className={s.container}>
      <div className={s.nameBlock}>
        <div className={s.name}>{name}</div>
        <div className={s.verified}>Подтверждено</div>
        <div className={s.starsRating}>
          <StarsRating amount={stars} />
        </div>
      </div>
      <div className={s.textBlock}>
        <div className={s.title}>{title}</div>
        <div className={s.text}>{text}</div>
      </div>
      <div className={s.dateBlock}>
        <div className={s.date}>{date}</div>
        {user?.role === "admin" && (
          <button className={s.deleteButton} onClick={handleDelete}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
