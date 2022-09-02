import React from 'react';
import s from './Featured.module.scss';

type TFeatured = { value: string; index: number };

const Featured: React.FC<TFeatured> = ({ value, index }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <li className={s.container}>
      <input
        type="checkbox"
        id={value + index}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor={value + index}>{value}</label>
    </li>
  );
};

export default Featured;
