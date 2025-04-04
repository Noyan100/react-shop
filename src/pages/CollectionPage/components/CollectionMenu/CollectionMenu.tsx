import React from "react";
import s from "./CollectionMenu.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { setSort } from "../../../../redux/slices/filterSlice";

type TCollectionMenu = {};

const CollectionMenu: React.FC<TCollectionMenu> = ({}) => {
  const dispatch = useAppDispatch();

  const options = [
    { value: "most price", label: "Цена по убыванию" },
    { value: "least price", label: "Цена по возрастанию" },
    { value: "most rating", label: "Сначала с высоким рейтингом" },
    { value: "least rating", label: "Сначала с низким рейтингом" },
  ];
  const { sort, currentPage } = useAppSelector((state) => state.filter);
  React.useEffect(() => {
    setSelectedOption(options.find((obj) => obj.value === sort));
  }, [sort]);
  const [selectActive, setSelectActive] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(
    options.find((obj) => obj.value === sort)
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
        <span className={s.textIn}>
          Показаны {currentPage === 1 ? currentPage : (currentPage - 1) * 9 + 1}
          -{currentPage * 9 > items.length ? items.length : currentPage * 9} из
        </span>
        <span>{items.length} Товаров</span>
      </div>
      <div className={s.sort}>
        <div className={s.select}>
          <span className={s.textIn}>Сортировать :</span>
          <div className={s.option} onClick={onClickSelect}>
            <span className={s.text}>{selectedOption.label}</span>
            <span
              className={`${s.arrow} ${selectActive && s.arrowActive}`}
            ></span>
          </div>
          <div
            className={`${s.selection} ${selectActive && s.selectionActive}`}
          >
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
