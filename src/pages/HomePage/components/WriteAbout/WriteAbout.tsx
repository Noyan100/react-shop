import React from "react";
import s from "./WriteAbout.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarsRating from "../../../../components/StarsRating/StarsRating";

type TWriteAbout = { collection: string[] };

const WriteAbout: React.FC<TWriteAbout> = ({ collection }) => {
  return (
    <div className={s.container}>
      <div className={s.textBlock}>
        <div className={s.title}>
          Роскошь, комфорт, стиль — ваше пространство заслуживает лучшего!
        </div>
        <div className={s.text}>
          Это просто восторг! Качество на высшем уровне — чувствуется, что
          каждая деталь продумана. Ткань шикарная, посадка идеальная, и видно,
          что сделано с душой. Такой уровень мастерства редко встретишь —
          однозначно стоит своих денег! Буду рекомендовать всем друзьям и сама
          присмотрю что-то ещё из коллекции. 5 звёзд без колебаний! ⭐⭐⭐⭐⭐
        </div>
        <div className={s.stars}>
          <StarsRating amount={5} />
          Вася Пупкин
        </div>
      </div>
      <Swiper
        grabCursor={true}
        slidesPerView={1}
        centeredSlides={true}
        navigation={true}
        pagination={{
          type: "fraction",
        }}
        modules={[Navigation, Pagination]}
        className={s.swiperBlock}
      >
        {collection.map((value, index) => (
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
