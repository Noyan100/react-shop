import React from "react";
import { Link } from "react-router-dom";
import s from "./Intro.module.scss";

type TIntro = {};

const Intro: React.FC<TIntro> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <span>ОТКРОЙТЕ МИР</span>
        <h1>ПРЕМИАЛЬНОГО КОМФОРТА</h1>
        <p>
          Позвольте нам преобразить ваше пространство — мебель, которая
          восхищает, вдохновляет и дарит неповторимую атмосферу уюта.
        </p>
        <div className={s.button}>
          <Link to="/products">Выбрать товары</Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
