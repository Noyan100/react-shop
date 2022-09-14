import React from 'react';
import s from './Carousel.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './Swiper.scss';
import Item from './Item/Item';

type TCarousel = {
  title?: string;
  subtitle?: string;
  items: { id: string; name: string; items: { photos: string[] }[]; cost: number }[];
};

const Carousel: React.FC<TCarousel> = ({ title = '', subtitle = '', items }) => {
  if (!items) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className={s.container}>
      <div className={s.textBlock}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.subtitle}>{subtitle}</p>
      </div>
      <Swiper
        grabCursor={true}
        slidesPerView={4}
        spaceBetween={55}
        breakpoints={{
          319: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          425: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1536: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1920: {
            slidesPerView: 4,
            spaceBetween: 55,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className={s.swiper}>
        {items.map((obj, index) => (
          <SwiperSlide key={index}>
            <Item item={obj} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
