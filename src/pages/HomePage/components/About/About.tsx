import React from "react";
import iconOne from "./assets/icon-one.svg";
import iconTwo from "./assets/icon-two.svg";
import iconThree from "./assets/icon-three.svg";
import s from "./About.module.scss";

type TAbout = {};

const About: React.FC<TAbout> = ({}) => {
  const items = [
    {
      title: "8 ЛЕТ ГАРАНТИИ",
      value: "Ваше спокойствие - наш приоритет",
      icon: iconOne,
    },
    { title: "Rust Free", value: "Quality Materials", icon: iconTwo },
    {
      title: "PREMIUM SERVICE",
      value: "Premium delivery available",
      icon: iconThree,
    },
  ];
  return (
    <div className={s.container}>
      {items.map((obj, index) => (
        <div className={s.item} key={index}>
          <div className={s.icon}>
            <img src={obj.icon} alt="" />
          </div>
          <h3 className={s.title}>{obj.title}</h3>
          <p className={s.text}>{obj.value}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
