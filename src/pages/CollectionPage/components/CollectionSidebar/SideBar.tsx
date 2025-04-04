import React from "react";
import CategoryItem from "./Category/Category";
import Featured from "./Featured/Featured";
import s from "./SideBar.module.scss";
import filterIcon from "./assets/filter-icon.svg";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import {
  resetFilter,
  setMaxPrice,
  setMinPrice,
} from "../../../../redux/slices/filterSlice";
import { debounce } from "lodash";

type TSideBar = {};

const SideBar: React.FC<TSideBar> = ({}) => {
  const dispatch = useAppDispatch();
  const category = [
    {
      category: "Новинки",
      list: ["Секции", "Диваны", "Кресла", "Стулья", "Раскладные"],
    },
    { category: "Гостиная", list: ["Журнальные столики", "Тумбы"] },
    { category: "Спальня", list: ["Кровати"] },
  ];
  const featured = ["Весна", "Распродажа", "Новинки", "Скидки"];

  const [min, setMin] = React.useState<number>(0);
  const [max, setMax] = React.useState<number>(0);

  const updateMinValue = React.useCallback(
    debounce((num: number) => {
      dispatch(setMinPrice(num));
    }, 250),
    []
  );
  const updateMaxValue = React.useCallback(
    debounce((num: number) => {
      dispatch(setMaxPrice(num));
    }, 250),
    []
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
          <li className={s.title}>Категория</li>
          {category.map((obj, index) => (
            <CategoryItem key={index} obj={obj} />
          ))}
        </ul>
        <ul className={`${s.featured} ${s.wrapper}`}>
          <li className={s.title}>Рекомендуемые</li>
          {featured.map((value, index) => (
            <Featured key={index} value={value} index={index} />
          ))}
        </ul>
        <div className={`${s.price} ${s.wrapper}`}>
          <div className={s.title}>Цена, ₽</div>
          <div className={s.minmax}>
            <div className={s.min}>
              <label>От</label>
              <input type="number" value={min} onChange={onChangeMin} />
            </div>
            <div className={s.max}>
              <label>До</label>
              <input type="number" value={max} onChange={onChangeMax} />
            </div>
          </div>
        </div>
        <div className={s.clearall} onClick={clearAll}>
          Очистить
        </div>
      </div>
    </div>
  );
};

export default SideBar;
