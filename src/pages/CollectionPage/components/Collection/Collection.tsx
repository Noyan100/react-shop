import React from 'react';
import s from './Collection.module.scss';
import temp from './assets/temp.jpg';
import Item from './Item/Item';

type TCollection = {};

const Collection: React.FC<TCollection> = ({}) => {
  const items = [
    { img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
    { img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
    { img: temp, name: 'Serene Linen Deluxe Cloud', cost: 2500, sale: 40 },
  ];
  return (
    <div className={s.container}>
      {items.map((obj, index) => (
        <Item key={index} {...{ ...obj }} />
      ))}
    </div>
  );
};

export default Collection;
