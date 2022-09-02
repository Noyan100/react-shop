import React from 'react';
import s from './Category.module.scss';
import CategoryItem from './CategoryItem';

type TCategory = { obj: { category: string; list: string[] } };

const Category: React.FC<TCategory> = ({ obj }) => {
  const [active, setActive] = React.useState(false);

  const onClickCategory = () => {
    setActive(!active);
  };

  return (
    <li className={s.container}>
      <div
        className={`${s.category} ${active ? s.categoryActive : undefined}`}
        onClick={onClickCategory}>
        {obj.category}
      </div>
      <ul className={active ? s.activeMenu : undefined}>
        {obj.list.map((value, index) => (
          <CategoryItem key={index} index={index} value={value} category={obj.category} />
        ))}
      </ul>
    </li>
  );
};

export default Category;
