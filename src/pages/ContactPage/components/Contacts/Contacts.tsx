import React from "react";
import s from "./Contacts.module.scss";
import contactOne from "./assets/contact-one.svg";
import contactTwo from "./assets/contact-two.svg";
import contactThree from "./assets/contact-three.svg";

type TContacts = {};

const Contacts: React.FC<TContacts> = ({}) => {
  const contacts = [
    { img: contactOne, name: "Телефон", value: "(12) 3456789" },
    { img: contactTwo, name: "Почта", value: "Hello@techno.co" },
    { img: contactThree, name: "Улица", value: "ул. Академика Киренского, 26" },
  ];
  return (
    <div className={s.container}>
      <div className={s.title}>Мы готовы помочь</div>
      <div className={s.subtitle}>
        Наша команда экспертов всегда на связи, чтобы ответить на ваши вопросы,
        помочь с выбором мебели или оформить заказ.
      </div>
      <div className={s.contacts}>
        {contacts.map((obj, index) => (
          <div className={s.item} key={obj.name + index}>
            <div className={s.img}>
              <img src={obj.img} alt={obj.name} />
            </div>
            <div className={s.textBlock}>
              <div className={s.name}>{obj.name}</div>
              <div className={s.text}>{obj.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
