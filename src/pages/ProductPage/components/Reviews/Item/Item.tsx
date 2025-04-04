import React from "react";
import StarsRating from "../../../../../components/StarsRating/StarsRating";
import s from "./Item.module.scss";

type TItem = {
  name: string;
  title: string;
  text: string;
  stars: number;
  date: number;
};

const Item: React.FC<TItem> = ({ name, title, text, stars, date }) => {
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
      </div>
    </div>
  );
};

export default Item;
