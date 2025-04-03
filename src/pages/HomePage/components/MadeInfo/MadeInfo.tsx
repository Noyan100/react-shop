import React from "react";
import s from "./MadeInfo.module.scss";
import icon from "./assets/icon.svg";

type TMadeInfo = {};

const MadeInfo: React.FC<TMadeInfo> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.icon}>
          <img src={icon} alt="" />
        </div>
        <div className={s.subtitle}>РУЧНАЯ РАБОТА ЕВРОПЕЙСКИХ МАСТЕРОВ</div>
        <div className={s.title}>
          Наше производство — это союз традиционного мастерства и премиальных
          материалов. Мы не делаем масс-маркет — мы создаем вещи, которые
          останутся с вами на годы.
        </div>
      </div>
      <div className={s.shadow}></div>
    </div>
  );
};

export default MadeInfo;
