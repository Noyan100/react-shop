import React from 'react';
import s from './PhotoBlock.module.scss';

type TPhotoBlock = { img: string };

const PhotoBlock: React.FC<TPhotoBlock> = ({ img }) => {
  return (
    <div className={s.img}>
      <img src={img} alt="image" />
    </div>
  );
};

export default PhotoBlock;
