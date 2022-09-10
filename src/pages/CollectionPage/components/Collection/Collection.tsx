import React from 'react';
import s from './Collection.module.scss';
import temp from './assets/temp.jpg';
import Item from './Item/Item';
import Pagination from '../../../../components/Pagination/Pagination';

type TCollection = {};

const Collection: React.FC<TCollection> = ({}) => {
  const items = [
    { id: '0', img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
    { id: '1', img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
    { id: '2', img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
  ];
  return (
    <div className={s.container}>
      <div className={s.items}>
        {items.map((obj, index) => (
          <Item key={index} {...{ ...obj }} />
        ))}
      </div>
      <div className={s.pagination}>
        <Pagination amount={7} />
      </div>
    </div>
  );
};

export default Collection;
