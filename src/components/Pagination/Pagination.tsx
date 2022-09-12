import React from 'react';
import s from './Pagination.module.scss';

type TPagination = { amount: number; paginate: (pageNumber: number) => void };

const Pagination: React.FC<TPagination> = ({ amount, paginate }) => {
  const items = Array.from({ length: amount }, (v, i) => i + 1);
  const [activePage, setActivePage] = React.useState(1);

  const onClickPrev = () => {
    if (activePage === 1) {
      setActivePage(amount);
      paginate(amount);
    } else {
      setActivePage(activePage - 1);
      paginate(activePage - 1);
    }
  };
  const onClickNext = () => {
    if (activePage === amount) {
      setActivePage(1);
      paginate(1);
    } else {
      setActivePage(activePage + 1);
      paginate(activePage + 1);
    }
  };

  return (
    <div className={s.pagination}>
      <ul className={s.paginate}>
        <li className={s.prevpage} onClick={onClickPrev}>
          <div className={s.pageText}>&lt;</div>
        </li>
        {items.map((value, index) => (
          <li
            key={index}
            className={`${s.page} ${activePage === value ? s.pageActive : undefined}`}>
            <div className={s.pageText}>{value}</div>
          </li>
        ))}
        <li className={s.nextpage} onClick={onClickNext}>
          <div className={s.pageText}>&gt;</div>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
