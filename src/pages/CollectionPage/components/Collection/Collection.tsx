import React from 'react';
import s from './Collection.module.scss';
import Item from './Item/Item';
import Pagination from '../../../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { setCurrentPage } from '../../../../redux/slices/filterSlice';

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
  return (
    <div className={s.container}>
      <div className={s.items}>
        {status === 'successful'
          ? items.map((obj, index) => <Item key={index} {...{ ...obj }} />)
          : ''}
      </div>
      <div className={s.pagination}>
        <Pagination amount={Math.ceil(items.length / 9)} paginate={paginate} />
      </div>
    </div>
  );
};

export default Collection;
