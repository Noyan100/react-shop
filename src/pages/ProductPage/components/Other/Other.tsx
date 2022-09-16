import React from 'react';
import s from './Other.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import axios from 'axios';

type TOther = {};

const Other: React.FC<TOther> = () => {
  const [items, setItems] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchItems() {
      try {
        const { data } = await axios.get(
          'https://62f37628a84d8c968123bc84.mockapi.io/items?page=1&limit=8?sortBy=rating',
        );
        setItems(data);
      } catch (error) {
        alert('Ошибка при получении предмета!');
        navigate('/');
      }
    }
    fetchItems();
  }, []);
  if (!items) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '100px 0', fontSize: '60px' }}>
        Загрузка...
      </div>
    );
  }
  return (
    <div className={s.container}>
      <div className={s.title}>Shop Our Other Popular Sets</div>
      <div className={s.items}>
        {items.map((obj, index) => (
          <div className={s.item} key={obj.id + index}>
            <div className={s.img}>
              <img src={obj.items[0].photos[0]} alt={obj.name} />
            </div>
            <div className={s.name}>{obj.name}</div>
            <div className={s.cost}>£{obj.cost}.00</div>
            <Link to={`/products/${obj.id}`}>View Set</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Other;
