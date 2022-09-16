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
  const currentPage = useAppSelector((state) => state.filter.currentPage);
  const [currentPageLocal, setCurrentPageLocal] = React.useState(1);
  const paginate = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };
  React.useEffect(() => {
    setCurrentPageLocal(currentPage);
  }, [currentPage]);
  const status = useAppSelector((state) => state.items.status);
  const pageItems = items.slice((currentPageLocal - 1) * 9, currentPageLocal * 9);
  const item = pageItems.map((obj, index) => <Item key={index} {...{ ...obj }} />);
  const skeleton = [...new Array(3)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className={s.container}>
      <div className={s.items}>{status === 'successful' ? item : skeleton}</div>
      <div className={s.empty}>{items.length === 0 ? <>Коллекций не найдено</> : ''}</div>
      {items.length !== 0 ? (
        <div className={s.pagination}>
          <Pagination
            amount={Math.ceil(items.length / 9)}
            paginate={paginate}
            activePage={currentPage}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Collection;
