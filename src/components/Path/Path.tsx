import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Path.module.scss';

type TPath = {};

const Path: React.FC<TPath> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <span className={s.home} onClick={() => navigate('/')}>
        HOME
      </span>
      <span> / </span>
      {location.pathname.split('/')}
    </div>
  );
};

export default Path;
