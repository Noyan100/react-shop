import React from 'react';
import s from './About.module.scss';
import image from './assets/image.jpg';

type TAbout = {};

const About: React.FC<TAbout> = ({}) => {
  return (
    <div className={s.container}>
      <div className={s.image}>
        <img src={image} alt="image furniture" />
      </div>
      <div className={s.text}>
        <div className={s.title}>We Are Meridian</div>
        <div className={s.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nulla a ut diam et, sapien
          dis. Iaculis turpis dui sed ipsum etiam. Habitant feugiat at enim pharetra. Lacus, dolor
          viverra amet purus nulla a, donec in egestas. Condimentum aenean odio pretium justo. Vitae
          in ut quam fermentum, eget. Luctus fermentum nulla magna eget at dapibus urna sit. Id non
          non arcu consequat at. Integer tortor interdum sit in quis fringilla euismod eros. Aliquam
          in enim morbi pulvinar. Sagittis accumsan pellentesque egestas ac massa sed sem. Mattis
          leo elementum dictum dolor faucibus. A sapien, nisi, justo euismod morbi.
        </div>
      </div>
    </div>
  );
};

export default About;
