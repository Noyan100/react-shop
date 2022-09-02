import React from 'react';
import s from './Category.module.scss';

type TCategoryItem = {
  index: number;
  value: string;
  category: string;
};

const CategoryItem: React.FC<TCategoryItem> = ({ index, value, category }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <li>
      <input
        type="checkbox"
        id={value + index + category}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor={value + index + category}>{value} (0)</label>
    </li>
  );
};

export default CategoryItem;
