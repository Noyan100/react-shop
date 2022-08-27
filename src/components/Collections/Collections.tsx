import React from 'react';
import { Link } from 'react-router-dom';
import collectionOne from './assets/collection-one.svg';
import collectionTwo from './assets/collection-two.svg';
import collectionThree from './assets/collection-three.svg';
import collectionFour from './assets/collection-four.svg';
import collectionFive from './assets/collection-five.svg';
import s from './Collections.module.scss';

type TCollections = {};

const Collections: React.FC<TCollections> = ({}) => {
  const items = [
    { value: 'Collection 1', image: collectionOne, path: '/', size: 2 },
    { value: 'Collection 2', image: collectionTwo, path: '/', size: 1 },
    { value: 'Collection 3', image: collectionThree, path: '/', size: 1 },
    { value: 'Collection 4', image: collectionFour, path: '/', size: 1 },
    { value: 'Collection 5', image: collectionFive, path: '/', size: 1 },
  ];
  return (
    <div className={s.container}>
      {items.map((obj, index) => (
        <div key={index} className={`${obj.size === 2 && s.sizeTwo} ${s.item}`}>
          <Link to={obj.path}>
            <div className={s.itemWrapper}>
              <div className={s.itemImg}>
                <img src={obj.image} alt="" />
              </div>
              <div className={s.title}>{obj.value}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Collections;
