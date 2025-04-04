import React from "react";
import s from "./About.module.scss";
import image from "./assets/image.jpg";

type TAbout = {};

const About: React.FC<TAbout> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.image}>
        <img src={image} alt="image furniture" />
      </div>
      <div className={s.text}>
        <div className={s.title}>Мы компания ТЕХНО | СТРОЙ</div>
        <div className={s.text}>
          ТЕХНО | СТРОЙ» — надежный поставщик качественной мебели для дома,
          офиса и коммерческих помещений. Мы предлагаем современные,
          функциональные и стильные решения, которые сочетают в себе эргономику,
          долговечность и эстетику.
          <div className={s.text}>Наши преимущества: </div>
          <div className={s.text}>
            ✔ Опыт и надежность — работаем на рынке более 10 лет, реализовали
            сотни успешных проектов.{" "}
          </div>
        </div>
        <div className={s.text}>
          ✔ Инновационные технологии — используем современные материалы и
          энергоэффективные решения.{" "}
        </div>
        <div className={s.text}>
          ✔ Прозрачность — фиксированные цены, четкие сроки и поэтапный контроль
          качества.{" "}
        </div>
        <div className={s.text}>
          ✔ Клиентоориентированность — индивидуальный подход к каждому
          заказчику.{" "}
        </div>
      </div>
    </div>
  );
};

export default About;
