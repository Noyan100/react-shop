import React from 'react';
import CategoryItem from './Category/Category';
import Featured from './Featured/Featured';
import s from './SideBar.module.scss';
import filterIcon from './assets/filter-icon.svg';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { resetFilter, setMaxPrice, setMinPrice } from '../../../../redux/slices/filterSlice';

type TSideBar = {};

const SideBar: React.FC<TSideBar> = ({}) => {
  const dispatch = useAppDispatch();
  const category = [
    { category: 'New Arrivals', list: ['Item'] },
    { category: 'Living Room', list: ['Item 1'] },
    { category: 'Kitchen & Dining Rooms', list: ['Item 2'] },
    { category: 'Bedrooms', list: ['Item 3'] },
    { category: 'Accents', list: ['Item 4'] },
    { category: 'Occasional Tables', list: ['Item 5'] },
    { category: 'Office/Home Office', list: ['Item 6'] },
    { category: 'Outdoor Furniture', list: ['Item 7'] },
  ];
  const featured = ['Spring', 'Sale', 'New Arrival', 'Clearance'];

  const [min, setMin] = React.useState<number>(0);
  const [max, setMax] = React.useState<number>(0);

  const onChangeMin = (event: React.FormEvent<HTMLInputElement>) => {
    setMin(Number(event.currentTarget.value));
    dispatch(setMinPrice(min));
  };
  const onChangeMax = (event: React.FormEvent<HTMLInputElement>) => {
    setMax(Number(event.currentTarget.value));
    dispatch(setMaxPrice(max));
  };

  const [filterActive, setFilterActive] = React.useState(false);
  const clearAll = () => {
    setMin(0);
    setMax(0);
    dispatch(resetFilter());
  };

  return (
    <div className={s.container}>
      <div className={s.filter} onClick={() => setFilterActive(!filterActive)}>
        <img src={filterIcon} alt="filter" /> Filter
      </div>
      <div className={`${s.items} ${filterActive ? s.itemsActive : undefined}`}>
        <ul className={`${s.category} ${s.wrapper}`}>
          <li className={s.title}>Category</li>
          {category.map((obj, index) => (
            <CategoryItem key={index} obj={obj} />
          ))}
        </ul>
        <ul className={`${s.featured} ${s.wrapper}`}>
          <li className={s.title}>Featured</li>
          {featured.map((value, index) => (
            <Featured key={index} value={value} index={index} />
          ))}
        </ul>
        <div className={`${s.price} ${s.wrapper}`}>
          <div className={s.title}>Price Range</div>
          <div className={s.minmax}>
            <div className={s.min}>
              <label>Min</label>
              <input type="number" value={min} onChange={onChangeMin} />
            </div>
            <div className={s.max}>
              <label>Max</label>
              <input type="number" value={max} onChange={onChangeMax} />
            </div>
          </div>
        </div>
        <div className={s.clearall} onClick={clearAll}>
          Clear All
        </div>
      </div>
    </div>
  );
};

export default SideBar;
