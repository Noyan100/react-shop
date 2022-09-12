import React from 'react';
import s from './CollectionMenu.module.scss';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
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
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [selectActive, setSelectActive] = React.useState(false);
  const onClickSelect = () => {
    setSelectActive(!selectActive);
  };
  const onChangeSelect = (obj: any) => {
    setSelectedOption(obj);
    dispatch(setSort(obj.value));
    setSelectActive(false);
  };

  return (
    <div className={s.container}>
      <div className={s.products}>
        <span className={s.textIn}>Showing</span> <span>1-24 of 557 Products</span>
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
