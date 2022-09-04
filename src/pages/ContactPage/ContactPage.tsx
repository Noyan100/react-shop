import React from 'react';
import PhotoBlock from '../../components/PhotoBlock/PhotoBlock';
import s from './ContactPage.module.scss';
import introImg from './assets/intro.jpg';
import Contacts from './components/Contacts/Contacts';
import Form from './components/Form/Form';

type TContactPage = {};

const ContactPage: React.FC<TContactPage> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.photo}>
        <PhotoBlock img={introImg} />
      </div>
      <div className={s.contacts}>
        <Contacts />
      </div>
      <div className={s.form}>
        <Form />
      </div>
    </div>
  );
};

export default ContactPage;
