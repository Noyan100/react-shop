import React from 'react';
import CategoryItem from './Category/Category';
import Featured from './Featured/Featured';
import s from './SideBar.module.scss';
import filterIcon from './assets/filter-icon.svg';

type TSideBar = {};

const SideBar: React.FC<TSideBar> = ({}) => {
  const category = [
    { category: 'New Arrivals', list: ['Item', 'Item', 'Item'] },
    { category: 'Living Room', list: ['Item', 'Item', 'Item'] },
    { category: 'Kitchen & Dining Rooms', list: ['Item', 'Item', 'Item'] },
    { category: 'Bedrooms', list: ['Item', 'Item', 'Item'] },
    { category: 'Accents', list: ['Item', 'Item', 'Item'] },
    { category: 'Occasional Tables', list: ['Item', 'Item', 'Item'] },
    { category: 'Office/Home Office', list: ['Item', 'Item', 'Item'] },
    { category: 'Outdoor Furniture', list: ['Item', 'Item', 'Item'] },
  ];
  const featured = ['Spring', 'Sale', 'New Arrival', 'Clearance'];

  const [min, setMin] = React.useState<number>(0);
  const [max, setMax] = React.useState<number>(0);

  const onChangeMin = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setMin(Number(value));
  };
  const onChangeMax = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setMax(Number(value));
  };

  const [filterActive, setFilterActive] = React.useState(false);

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
        <div className={s.clearall}>Clear All</div>
      </div>
    </div>
  );
};

export default SideBar;
