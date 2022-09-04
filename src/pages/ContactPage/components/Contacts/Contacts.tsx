import React from 'react';
import s from './Contacts.module.scss';
import contactOne from './assets/contact-one.svg';
import contactTwo from './assets/contact-two.svg';
import contactThree from './assets/contact-three.svg';

type TContacts = {};

const Contacts: React.FC<TContacts> = ({}) => {
  const contacts = [
    { img: contactOne, name: 'Phone Number', value: '(62) 1829017' },
    { img: contactTwo, name: 'Email', value: 'Hello@Meridian.co' },
    { img: contactThree, name: 'Map Street', value: 'John Bucarest St. 199' },
  ];
  return (
    <div className={s.container}>
      <div className={s.title}>We Ready To Help</div>
      <div className={s.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nulla a ut diam et, sapien
        dis
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
