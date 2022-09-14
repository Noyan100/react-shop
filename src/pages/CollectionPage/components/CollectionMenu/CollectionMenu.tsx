import React from 'react';
import s from './CollectionMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { setSort } from '../../../../redux/slices/filterSlice';

type TCollectionMenu = {};

const CollectionMenu: React.FC<TCollectionMenu> = ({}) => {
  const dispatch = useAppDispatch();

  const options = [
    { value: 'most recent', label: 'Most recent' },
    { value: 'least recent', label: 'Least recent' },
    { value: 'most price', label: 'Most price' },
    { value: 'least price', label: 'Least price' },
  ];
  const sort = useAppSelector((state) => state.filter.sort);
  React.useEffect(() => {
    setSelectedOption(options.find((obj) => obj.value === sort));
  }, [sort]);
  const [selectActive, setSelectActive] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(
    options.find((obj) => obj.value === sort),
  );

  const onClickSelect = () => {
    setSelectActive(!selectActive);
  };
  const onChangeSelect = (obj: any) => {
    setSelectedOption(obj);
    dispatch(setSort(obj.value));
    setSelectActive(false);
  };
  const items = useAppSelector((state) => state.items.items);

  return (
    <div className={s.container}>
      <div className={s.products}>
        <span className={s.textIn}>Showing</span>
        <span>{items.length} Products</span>
      </div>
      <div className={s.sort}>
        <div className={s.select}>
          <span className={s.textIn}>Sort by</span>
          <div className={s.option} onClick={onClickSelect}>
            <span className={s.text}>{selectedOption.label}</span>
            <span className={`${s.arrow} ${selectActive && s.arrowActive}`}></span>
          </div>
          <div className={`${s.selection} ${selectActive && s.selectionActive}`}>
            <ul>
              {options.map((obj, index) => (
                <li key={index + obj.value} onClick={() => onChangeSelect(obj)}>
                  {obj.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionMenu;
