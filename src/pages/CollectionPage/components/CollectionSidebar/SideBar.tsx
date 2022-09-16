import React from 'react';
import CategoryItem from './Category/Category';
import Featured from './Featured/Featured';
import s from './SideBar.module.scss';
import filterIcon from './assets/filter-icon.svg';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { resetFilter, setMaxPrice, setMinPrice } from '../../../../redux/slices/filterSlice';
import { debounce } from 'lodash';

type TSideBar = {};

const SideBar: React.FC<TSideBar> = ({}) => {
  const dispatch = useAppDispatch();
  const category = [
    { category: 'New Arrivals', list: ['Sectional', 'Sofas', 'Accent', 'Chairs', 'Sleepers'] },
    { category: 'Living Room', list: ['Coffee tables', 'Side Tables'] },
    { category: 'Bedrooms', list: ['Beds'] },
  ];
  const featured = ['Spring', 'Sale', 'New Arrival', 'Clearance'];

  const [min, setMin] = React.useState<number>(0);
  const [max, setMax] = React.useState<number>(0);

  const updateMinValue = React.useCallback(
    debounce((num: number) => {
      dispatch(setMinPrice(num));
    }, 250),
    [],
  );
  const updateMaxValue = React.useCallback(
    debounce((num: number) => {
      dispatch(setMaxPrice(num));
    }, 250),
    [],
  );

  const onChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(Number(event.target.value));
    updateMinValue(Number(event.target.value));
  };
  const onChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMax(Number(event.target.value));
    updateMaxValue(Number(event.target.value));
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
