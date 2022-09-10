import React from 'react';
import Accordion from '../../components/Accordion/Accordion';
import About from './components/About/About';
import Other from './components/Other/Other';
import Product from './components/Product/Product';
import Reviews from './components/Reviews/Reviews';
import s from './ProductPage.module.scss';

type TProductPage = {};

const ProductPage: React.FC<TProductPage> = ({}) => {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const accordion = [
    {
      title: 'Can I return my furniture?',
      text: 'In the unlikely event that you wish to return your furniture, Sabai Living offer a 30-day returns policy. However, you will be charged an administrative fee to cover this. Your refund will be processed as soon as the product has been returned to our warehouse and has been thoroughly checked for any damage or quality issues. Sabai Living can only issue refunds for items that are not damaged.',
    },
  ];
  return (
    <div className={s.container}>
      <div className={s.product}>
        <Product />
      </div>
      <div className={s.about}>
        <About />
      </div>
      <div className={s.accordion}>
        <div className={s.title}>Frequently Asked Questions</div>
        <Accordion items={accordion} />
      </div>
      <div className={s.other}>
        <Other />
      </div>
      <div className={s.reviews}>
        <Reviews />
      </div>
    </div>
  );
};

export default ProductPage;
