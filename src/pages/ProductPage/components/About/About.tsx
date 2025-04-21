import React from "react";
import s from "./About.module.scss";
import image from "./assets/img.jpg";

type TAbout = {};

const About: React.FC<TAbout> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.img}>
        <img src={image} alt="Мебель высокого качества" />
      </div>
      <div className={s.textBlock}>
        <h2 className={s.title}>О качестве нашей мебели</h2>
        <div className={s.text}>
          <div className={s.feature}>
            <h3 className={s.featureTitle}>
              Многоступенчатый контроль качества
            </h3>
            <p>
              Каждое изделие проходит строгую проверку на всех этапах
              производства — от отбора материалов до финальной сборки.
            </p>
          </div>

          <div className={s.feature}>
            <h3 className={s.featureTitle}>Экологичные материалы</h3>
            <p>
              Мы используем только безопасное сырьё с сертификатами качества,
              чтобы ваша мебель была не только красивой, но и безопасной для
              здоровья.
            </p>
          </div>

          <div className={s.feature}>
            <h3 className={s.featureTitle}>Продуманная конструкция</h3>
            <p>
              Устойчивые каркасы, качественная фурнитура и тщательно
              разработанные механизмы обеспечивают долгий срок службы без
              компромиссов.
            </p>
          </div>

          <div className={s.feature}>
            <h3 className={s.featureTitle}>Долговечность и безупречный вид</h3>
            <p>
              Специальные покрытия и обработки защищают поверхности от царапин,
              влаги и выцветания, сохраняя первоначальный вид на годы.
            </p>
          </div>

          <p className={s.conclusion}>
            Наша мебель создана не просто для интерьера — она создана для жизни.
            Она ежедневно дарит вам комфорт, оставаясь такой же функциональной и
            эстетичной, как в первый день.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
