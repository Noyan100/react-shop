import React from 'react';
import Pagination from '../../../../components/Pagination/Pagination';
import Item from './Item/Item';
import s from './Reviews.module.scss';

type TReviews = {};

const Reviews: React.FC<TReviews> = ({}) => {
  const items = [
    {
      name: 'Darrell Steward',
      stars: 5,
      title: 'I Like This Product!',
      text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
      date: 'February 1st, 2022',
    },
    {
      name: 'Darrell Steward',
      stars: 5,
      title: 'I Like This Product!',
      text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
      date: 'February 1st, 2022',
    },
  ];
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.title}>Reviews (168)</div>
        <button className={s.button}>Write A Review</button>
      </div>
      <div className={s.items}>
        {items.map((obj, index) => (
          <Item {...{ ...obj }} key={obj.name + index + obj.date} />
        ))}
      </div>
      <div className={s.pagination}>
        <Pagination amount={5} />
      </div>
    </div>
  );
};

export default Reviews;
