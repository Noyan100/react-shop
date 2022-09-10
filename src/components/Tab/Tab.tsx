import React from 'react';
import s from './Tab.module.scss';

type TTab = { items: { title: string; subtitle: string; text: string }[] };

const Tab: React.FC<TTab> = ({ items }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div className={s.container}>
      <div className={s.items}>
        {items.map((obj, index) => (
          <div
            className={`${s.item} ${activeTab === index ? s.itemActive : undefined}`}
            key={obj.title + index}>
            <div className={s.title} onClick={() => setActiveTab(index)}>
              {obj.title}
            </div>
          </div>
        ))}
      </div>
      {items.map((obj, index) => (
        <div
          className={`${s.textContainer} ${
            activeTab === index ? s.textContainerActive : undefined
          }`}
          key={obj.title + index}>
          <div className={s.subtitle}>{obj.subtitle}</div>
          <div className={s.text}>{obj.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Tab;
