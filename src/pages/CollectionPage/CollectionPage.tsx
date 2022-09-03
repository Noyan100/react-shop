import React from 'react';
import SideBar from './components/CollectionSidebar/SideBar';
import s from './CollectionPage.module.scss';
import CollectionMenu from './components/CollectionMenu/CollectionMenu';
import Collection from './components/Collection/Collection';
import Path from '../../components/Path/Path';

type TCollectionPage = {};

const CollectionPage: React.FC<TCollectionPage> = ({}) => {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);
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
        <Collection />
      </div>
    </div>
  );
};

export default CollectionPage;
