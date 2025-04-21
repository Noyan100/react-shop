import React from "react";
import { Link } from "react-router-dom";
import s from "./Intro.module.scss";

type TIntro = {};

const Intro: React.FC<TIntro> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.title}>ТЕХНО | СТРОЙ</div>
        <p>
          Ваш надежный партнер и профессиональный проводник в мире стильной
          мебели и современных интерьерных решений!
        </p>
        <div className={s.button}>
          <Link to="/products">Каталог</Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
