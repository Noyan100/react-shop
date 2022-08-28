import React from 'react';
import s from './WriteAbout.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import collectionTwo from '../../pages/HomePage/assets/collection-two.jpg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import StarsRating from '../StarsRating/StarsRating';

type TWriteAbout = {};

const WriteAbout: React.FC<TWriteAbout> = ({}) => {
  const items = [
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
  ];
  return (
    <div className={s.container}>
      <div className={s.textBlock}>
        <div className={s.title}>FURNITURE TO WRITE HOME ABOUT</div>
        <div className={s.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id dictum quam nisi, eget est
          commodo neque aliquam leo. Rhoncus habitant eu aliquam elit ipsum sagittis, sit proin.
          Donec magna sapien et blandit vehicula vestibulum. Laoreet sagittis augue quis lacinia. Ut
          enim eget semper odio pretium rhoncus. Blandit velit augue donec ut rhoncus semper
          imperdiet adipiscing dignissim. Nisl sit dui etiam morbi morbi facilisi tristique.
        </div>
        <div className={s.stars}>
          <StarsRating amount={5} />
          Wade Warren
        </div>
      </div>
      <Swiper
        grabCursor={true}
        slidesPerView={1}
        centeredSlides={true}
        navigation={true}
        pagination={{
          type: 'fraction',
        }}
        modules={[Navigation, Pagination]}
        className={s.swiperBlock}>
        {items.map((value, index) => (
          <SwiperSlide key={index} className={s.item}>
            <div className={s.image}>
              <img src={value} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WriteAbout;
