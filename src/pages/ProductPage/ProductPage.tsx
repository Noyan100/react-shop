import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Accordion from '../../components/Accordion/Accordion';
import { TItem } from '../../redux/types/types';
import About from './components/About/About';
import Other from './components/Other/Other';
import Product from './components/Product/Product';
import Reviews from './components/Reviews/Reviews';
import s from './ProductPage.module.scss';

type TProductPage = {};

const ProductPage: React.FC<TProductPage> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = React.useState<TItem>();
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);
  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get('https://62f37628a84d8c968123bc84.mockapi.io/items/' + id);
        setItem(data);
      } catch (error) {
        alert('Ошибка при получении коллекции!');
        navigate('/');
      }
    }
    fetchItem();
  }, []);
  const accordion = [
    {
      title: 'Can I return my furniture?',
      text: 'In the unlikely event that you wish to return your furniture, Sabai Living offer a 30-day returns policy. However, you will be charged an administrative fee to cover this. Your refund will be processed as soon as the product has been returned to our warehouse and has been thoroughly checked for any damage or quality issues. Sabai Living can only issue refunds for items that are not damaged.',
    },
  ];
  if (!item) {
    return <>Загрузка...</>;
  }
  return (
    <div className={s.container}>
      <div className={s.product}>
        <Product
          name={item.name}
          cost={item.cost}
          sale={item.sale}
          items={item.items}
          reviews={item.reviews}
        />
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
        <Reviews items={item.reviews} />
      </div>
    </div>
  );
};

export default ProductPage;
