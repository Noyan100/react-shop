import React from "react";
import s from "./About.module.scss";

const About = () => {
  return (
    <div className={s.whiteSurface}>
      <div className={s.content}>
        <h1 className={s.mainTitle}>
          МЫ КОМПАНИЯ <span className={s.accent}>ТЕХНО | СТРОЙ</span>
        </h1>

        <div className={s.textGrid}>
          <p className={s.introText}>
            <strong>ТЕХНО | СТРОЙ</strong> — ведущий поставщик премиальной
            мебели для дома, офиса и коммерческих помещений.
          </p>

          <p className={s.detailText}>
            Создаём инновационные, функциональные и стильные решения, сочетающие
            эргономику, долговечность и безупречный дизайн.
          </p>

          <div className={s.advantages}>
            <h2 className={s.advantagesTitle}>НАШИ ПРЕИМУЩЕСТВА:</h2>
            <ul className={s.advantagesList}>
              <li className={s.advantageItem}>
                <span className={s.checkMark}>✓</span>
                <div>
                  <strong>ОПЫТ И НАДЁЖНОСТЬ</strong> — работаем на рынке более
                  10 лет, реализовали сотни успешных проектов
                </div>
              </li>
              <li className={s.advantageItem}>
                <span className={s.checkMark}>✓</span>
                <div>
                  <strong>ИННОВАЦИОННЫЕ ТЕХНОЛОГИИ</strong> — используем
                  передовые материалы и энергоэффективные решения
                </div>
              </li>
              <li className={s.advantageItem}>
                <span className={s.checkMark}>✓</span>
                <div>
                  <strong>ПРОЗРАЧНОСТЬ</strong> — фиксированные цены, чёткие
                  сроки и многоэтапный контроль качества
                </div>
              </li>
              <li className={s.advantageItem}>
                <span className={s.checkMark}>✓</span>
                <div>
                  <strong>КЛИЕНТООРИЕНТИРОВАННОСТЬ</strong> — персональный
                  подход к каждому заказчику
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
