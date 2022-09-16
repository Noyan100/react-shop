import React from 'react';
import PhotoBlock from '../../components/PhotoBlock/PhotoBlock';
import s from './FAQPage.module.scss';
import introImg from './assets/intro.svg';
import FAQ from './components/FAQ/FAQ';

type TFAQPage = {};

const FAQPage: React.FC<TFAQPage> = ({}) => {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className={s.container}>
      <PhotoBlock img={introImg} />
      <div className={s.faq}>
        <FAQ />
      </div>
    </div>
  );
};

export default FAQPage;
