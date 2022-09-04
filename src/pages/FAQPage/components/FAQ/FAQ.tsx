import React from 'react';
import Accordion from '../../../../components/Accordion/Accordion';
import s from './FAQ.module.scss';

type TFAQ = {};

const FAQ: React.FC<TFAQ> = ({}) => {
  const items = [
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non potenti imperdiet porttitor. Nunc eget ornare elementum risus eu in. Varius id senectus id viverra sollicitudin lacus ante nullam egestas. ',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non potenti imperdiet porttitor. Nunc eget ornare elementum risus eu in. Varius id senectus id viverra sollicitudin lacus ante nullam egestas. ',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non potenti imperdiet porttitor. Nunc eget ornare elementum risus eu in. Varius id senectus id viverra sollicitudin lacus ante nullam egestas. ',
    },
  ];
  return (
    <div className={s.container}>
      <div className={s.title}>Frequently Asked Questions</div>
      <Accordion items={items} />
    </div>
  );
};

export default FAQ;
