import React from 'react';
import s from './About.module.scss';
import image from './assets/img.svg';

type TAbout = {};

const About: React.FC<TAbout> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.img}>
        <img src={image} alt="image furniture" />
      </div>
      <div className={s.textBlock}>
        <div className={s.title}>Cast Aluminium Furniture</div>
        <div className={s.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non suspendisse vivamus
          convallis proin. Molestie pulvinar tortor neque adipiscing mattis diam nibh nunc quis.
          Nisl sit faucibus amet et pharetra. Vitae quis porta aliquet semper. Pulvinar augue
          commodo facilisis sit habitant donec. Sed senectus natoque vitae faucibus volutpat cras ac
          ullamcorper nec. Quam tortor in aliquam iaculis fringilla. Diam feugiat mattis pulvinar
          congue mattis. Dui felis lacus, porta a facilisi. Nunc aliquam vulputate sem sapien lacus,
          nisi. Ullamcorper purus ut nisl non malesuada amet. Neque viverra quis dui et. Elit, et
          fringilla convallis elementum sodales non in. Amet amet, ut nunc quam.
        </div>
      </div>
    </div>
  );
};

export default About;
