import React from 'react';
import s from './Pagination.module.scss';

type TPagination = { amount: number; paginate: (pageNumber: number) => void; activePage?: number };

const Pagination: React.FC<TPagination> = ({ amount, paginate, activePage = 1 }) => {
  const items = Array.from({ length: amount }, (v, i) => i + 1);
  const [localActivePage, setLocalActivePage] = React.useState(activePage);
  React.useEffect(() => {
    setLocalActivePage(activePage);
  }, [activePage]);

  const onClickPrev = () => {
    if (localActivePage === 1) {
      setLocalActivePage(amount);
      paginate(amount);
    } else {
      setLocalActivePage(localActivePage - 1);
      paginate(localActivePage - 1);
    }
  };
  const onClickNext = () => {
    if (localActivePage === amount) {
      setLocalActivePage(1);
      paginate(1);
    } else {
      setLocalActivePage(localActivePage + 1);
      paginate(localActivePage + 1);
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
            className={`${s.page} ${localActivePage === value ? s.pageActive : undefined}`}>
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
