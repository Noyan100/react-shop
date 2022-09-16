import React from 'react';
import SideBar from './components/CollectionSidebar/SideBar';
import s from './CollectionPage.module.scss';
import CollectionMenu from './components/CollectionMenu/CollectionMenu';
import Collection from './components/Collection/Collection';
import Path from '../../components/Path/Path';
import { fetchItems } from '../../redux/thunks/fetchItems';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

type TCollectionPage = {};

const CollectionPage: React.FC<TCollectionPage> = ({}) => {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.items.items);
  const { category, currentPage, featured, minPrice, maxPrice, sort } = useAppSelector(
    (state) => state.filter,
  );
  React.useEffect(() => {
    dispatch(fetchItems({ category, currentPage, featured, minPrice, maxPrice, sort }));
  }, [category, currentPage, featured, minPrice, maxPrice, sort]);

  return (
    <div className={s.container}>
      <div className={s.path}>
        <Path />
      </div>
      <div className={s.title}>Collection</div>
      <div className={s.menu}>
        <CollectionMenu />
      </div>
      <div className={s.sidebar}>
        <SideBar />
      </div>
      <div className={s.collection}>
        <Collection items={items} />
      </div>
    </div>
  );
};

export default CollectionPage;
