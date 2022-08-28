import React from 'react';
import s from './HomePage.module.scss';
import collectionOne from './assets/collection-one.jpg';
import collectionTwo from './assets/collection-two.jpg';
import collectionThree from './assets/collection-three.jpg';
import collectionFour from './assets/collection-four.jpg';
import collectionFive from './assets/collection-five.jpg';
import itemOne from './assets/item-one.svg';
import itemTwo from './assets/item-two.svg';
import itemThree from './assets/item-three.svg';
import itemFour from './assets/item-four.svg';
import Intro from '../../components/Intro/Intro';
import Collections from '../../components/Collections/Collections';
import About from '../../components/About/About';
import Carousel from '../../components/Carousel/Carousel';
import MadeInfo from '../../components/MadeInfo/MadeInfo';
import WriteAbout from '../../components/WriteAbout/WriteAbout';
import ViewProduct from '../../components/ViewProduct/ViewProduct';

type THome = {};

const Home: React.FC<THome> = ({}) => {
  const collectionsOne = [
    { value: 'Collection 1', image: collectionOne, path: '/', size: 2 },
    { value: 'Collection 2', image: collectionTwo, path: '/', size: 1 },
    { value: 'Collection 3', image: collectionThree, path: '/', size: 1 },
    { value: 'Collection 4', image: collectionFour, path: '/', size: 1 },
    { value: 'Collection 5', image: collectionFive, path: '/', size: 1 },
  ];
  const collectionsTwo = [
    { value: 'Collection 1', image: collectionOne, path: '/', size: 2 },
    { value: 'Collection 2', image: collectionTwo, path: '/', size: 1 },
    { value: 'Collection 3', image: collectionThree, path: '/', size: 1 },
    { value: 'Collection 4', image: collectionFour, path: '/', size: 1 },
    { value: 'Collection 5', image: collectionFive, path: '/', size: 1 },
  ];
  const swipers = [
    { id: '1', title: 'Alina Velvet Modular Armless', image: itemOne, cost: 12412 },
    { id: '2', title: 'Alina Velvet Modular Sectional', image: itemTwo, cost: 424 },
    { id: '3', title: 'Serpentine Velvet Sofa', image: itemThree, cost: 12 },
    { id: '4', title: 'Clarion Dining Chair', image: itemFour, cost: 325 },
    { id: '5', title: 'Clarion Dining Chair', image: itemFour, cost: 5555 },
  ];
  return (
    <div className={s.container}>
      <Intro />
      <Collections items={collectionsOne} />
      <About />
      <Carousel
        title="Ready to ship"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est id pretium pellentesque leo. Lorem."
        items={swipers}
      />
      <MadeInfo />
      <Collections
        title="Explore each unique collection"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est id pretium pellentesque leo. Lorem."
        items={collectionsTwo}
      />
      <WriteAbout />
      <ViewProduct />
    </div>
  );
};

export default Home;
