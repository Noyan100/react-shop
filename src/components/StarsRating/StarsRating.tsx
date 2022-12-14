import React from 'react';
import s from './StarsRating.module.scss';
import star from './assets/star.svg';
import starGray from './assets/star-gray.svg';

type TStarsRating = {
  amount?: number;
};

const StarsRating: React.FC<TStarsRating> = ({ amount = 5 }) => {
  return (
    <span className={s.container}>
      {[...new Array(5)].map((value, index) =>
        index >= amount ? (
          <img src={starGray} alt="star" key={index} />
        ) : (
          <img src={star} alt="star" key={index} />
        ),
      )}
    </span>
  );
};

export default StarsRating;
