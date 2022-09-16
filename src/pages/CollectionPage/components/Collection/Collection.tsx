import React from 'react';
import s from './Collection.module.scss';
import Item from './Item/Item';
import Pagination from '../../../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { setCurrentPage } from '../../../../redux/slices/filterSlice';
import Skeleton from './Item/Skeleton';

type TCollection = {
  items: {
    id: string;
    name: string;
    cost: number;
    sale: number;
    items: { color: string; photos: string[] }[];
  }[];
};

const Collection: React.FC<TCollection> = ({ items }) => {
  const dispatch = useAppDispatch();
  const [currentPageLocal, setCurrentPageLocal] = React.useState(1);
  const paginate = (pageNumber: number) => {
    setCurrentPageLocal(pageNumber);
    dispatch(setCurrentPage(pageNumber));
  };
  const status = useAppSelector((state) => state.items.status);
  const item = items.map((obj, index) => <Item key={index} {...{ ...obj }} />);
  const skeleton = [...new Array(3)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className={s.container}>
      <div className={s.items}>{status === 'successful' ? item : skeleton}</div>
      <div className={s.pagination}>
        <Pagination amount={2} paginate={paginate} />
      </div>
    </div>
  );
};

export default Collection;
