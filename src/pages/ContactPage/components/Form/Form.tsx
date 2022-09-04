import React from 'react';
import s from './Form.module.scss';

type TForm = {};

const Form: React.FC<TForm> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.title}>Let’s Talk With Us</div>
      <div className={s.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nulla a ut diam et, sapien
        dis
      </div>
      <form className={s.form}>
        <label htmlFor="name" className={s.name}>
          Name
          <input type="text" id="name" placeholder="Enter your name" />
        </label>
        <label htmlFor="email" className={s.email}>
          Email
          <input type="email" id="email" placeholder="Enter your email" />
        </label>
        <label htmlFor="message" className={s.message}>
          Message
          <textarea id="message" placeholder="Write your message" />
        </label>
      </form>
      <button type="submit" className={s.button}>
        Send Message
      </button>
    </div>
  );
};

export default Form;
