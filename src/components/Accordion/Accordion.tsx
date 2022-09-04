import React from 'react';
import s from './Accordion.module.scss';
import Item from './Item';

type TAccordion = { items: { title: string; text: string }[] };

const Accordion: React.FC<TAccordion> = ({ items }) => {
  return (
    <div className={s.container}>
      {items.map((obj, index) => (
        <Item title={obj.title} text={obj.text} key={obj.title + index} />
      ))}
    </div>
  );
};

export default Accordion;
