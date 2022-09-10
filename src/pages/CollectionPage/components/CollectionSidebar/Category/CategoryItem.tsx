import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import { addCategory, removeCategory } from '../../../../../redux/slices/filterSlice';
import s from './Category.module.scss';

type TCategoryItem = {
  index: number;
  value: string;
  category: string;
};

const CategoryItem: React.FC<TCategoryItem> = ({ index, value, category }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.filter.category);
  const [checked, setChecked] = React.useState(false);
  const onClickInput = () => {
    setChecked(!checked);
    categories.includes(value) ? dispatch(removeCategory(value)) : dispatch(addCategory(value));
  };
  return (
    <li>
      <input
        type="checkbox"
        id={value + index + category}
        checked={checked}
        onChange={onClickInput}
      />
      <label htmlFor={value + index + category}>{value} (0)</label>
    </li>
  );
};

export default CategoryItem;
