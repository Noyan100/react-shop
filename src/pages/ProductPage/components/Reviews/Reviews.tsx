import React from "react";
import Pagination from "../../../../components/Pagination/Pagination";
import Item from "./Item/Item";
import s from "./Reviews.module.scss";

type TReviews = {
  items: {
    name: string;
    title: string;
    text: string;
    date: number;
    stars: number;
  }[];
};

const Reviews: React.FC<TReviews> = ({ items }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const currentItems = items.slice(currentPage * 3 - 3, currentPage * 3);
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.title}>Отзывы ({items.length})</div>
        {/* <button className={s.button}>Write A Review</button> */}
      </div>
      <div className={s.items}>
        {currentItems.map((obj, index) => (
          <Item {...{ ...obj }} key={obj.name + index + obj.date} />
        ))}
      </div>
      <div className={s.pagination}>
        <Pagination amount={Math.ceil(items.length / 3)} paginate={paginate} />
      </div>
    </div>
  );
};

export default Reviews;
