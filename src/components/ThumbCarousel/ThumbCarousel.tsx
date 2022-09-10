import React from 'react';
import s from './ThumbCarousel.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import { Thumbs, Navigation } from 'swiper';

type TThumbCarousel = { items: string[] };

const ThumbCarousel: React.FC<TThumbCarousel> = ({ items }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  return (
    <div className={s.container}>
      <Swiper thumbs={{ swiper: thumbsSwiper }} modules={[Thumbs]} className={s.swiper} grabCursor>
        {items.map((value, index) => (
          <SwiperSlide key={value + index} className={s.item}>
            <div className={s.img}>
              <img src={value} alt="image furniture" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        navigation
        slidesPerView={5}
        loop
        modules={[Thumbs, Navigation]}
        className={s.swiperThumb}>
        {items.map((value, index) => (
          <SwiperSlide key={value + index} className={s.item}>
            <div className={s.img}>
              <img src={value} alt="image furniture" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbCarousel;
