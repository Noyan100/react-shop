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
  const [checked, setChecked] = React.useState(categories.includes(value));
  React.useEffect(() => {
    setChecked(categories.includes(value));
  }, [categories]);
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
      <label htmlFor={value + index + category}>{value}</label>
    </li>
  );
};

export default CategoryItem;
