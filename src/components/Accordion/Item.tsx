import React from 'react';
import s from './Accordion.module.scss';

type TItem = { title: string; text: string };

const Item: React.FC<TItem> = ({ title, text }) => {
  const [active, setActive] = React.useState(false);
  return (
    <div
      className={`${s.item} ${active ? s.itemActive : undefined}`}
      onClick={() => setActive(!active)}>
      <div className={s.title}>{title}</div>
      <div className={s.text}>{text}</div>
    </div>
  );
};

export default Item;
