import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import { addFeatured, removeFeatured } from '../../../../../redux/slices/filterSlice';
import s from './Featured.module.scss';

type TFeatured = { value: string; index: number };

const Featured: React.FC<TFeatured> = ({ value, index }) => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useAppDispatch();
  const featured = useAppSelector((state) => state.filter.featured);
  const onClickInput = () => {
    setChecked(!checked);
    featured.includes(value) ? dispatch(removeFeatured(value)) : dispatch(addFeatured(value));
  };
  return (
    <li className={s.container}>
      <input type="checkbox" id={value + index} checked={checked} onChange={onClickInput} />
      <label htmlFor={value + index}>{value}</label>
    </li>
  );
};

export default Featured;
