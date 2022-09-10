import React from 'react';
import s from './CollectionMenu.module.scss';
import Select, { SingleValue } from 'react-select';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { setSort } from '../../../../redux/slices/filterSlice';

type TCollectionMenu = {};

type TOption = {
  value: string;
  label: string;
};

const CollectionMenu: React.FC<TCollectionMenu> = ({}) => {
  const dispatch = useAppDispatch();
  const customStyles = {
    control: (styles: any, state: any) => ({
      ...styles,
      fontSize: '16px',
      fontWeight: '500',
      color: '#000',
      padding: '1px 5px 2px',
      border: '1px solid #E3E3E3',
      borderRadius: '0',
      width: '155px',
      cursor: 'pointer',
    }),
    menu: (styles: any) => ({
      ...styles,
      fontSize: '16px',
      width: '200px',
      top: '35px',
      borderRadius: '0 0 5px 5px',
      cursor: 'pointer',
    }),
    input: (styles: any) => ({
      ...styles,
      cursor: 'pointer',
    }),
    indicatorSeparator: (styles: any, state: any) => ({
      ...styles,
      backgroundColor: '#fff',
      cursor: 'pointer',
    }),
    option: (styles: any, state: any) => ({
      ...styles,
      backgroundColor: state.isSelected ? '#a7a7a7' : '#fff',
      cursor: 'pointer',
    }),
  };

  const options = [
    { value: 'most recent', label: 'Most recent' },
    { value: 'least recent', label: 'Least recent' },
    { value: 'most price', label: 'Most price' },
    { value: 'least price', label: 'Least price' },
  ];
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const onChangeSelect = (newValue: SingleValue<TOption>) => {
    setSelectedOption(newValue);
    dispatch(setSort(newValue.value));
  };

  return (
    <div className={s.container}>
      <div className={s.products}>
        <span className={s.textIn}>Showing</span> <span>1-24 of 557 Products</span>
      </div>
      <div className={s.sort}>
        <span className={s.textIn}>Sort by</span>
        <Select
          defaultValue={selectedOption}
          onChange={onChangeSelect}
          options={options}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default CollectionMenu;
