import React from "react";
import s from "./Form.module.scss";

type TForm = {};

const Form: React.FC<TForm> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.title}>Свяжись с нами</div>
      <div className={s.subtitle}>
        Мы всегда рады помочь вам и ответить на любые вопросы!
      </div>
      <form className={s.form}>
        <label htmlFor="name" className={s.name}>
          <input type="text" id="name" placeholder="Имя" />
        </label>
        <label htmlFor="email" className={s.email}>
          <input type="email" id="email" placeholder="Почта" />
        </label>
        <label htmlFor="message" className={s.message}>
          <textarea id="message" placeholder="Написать сообщение..." />
        </label>
      </form>
      <button type="submit" className={s.button}>
        Отправить
      </button>
    </div>
  );
};

export default Form;
