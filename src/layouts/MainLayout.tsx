import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

type TMainLayout = {};

const MainLayout: React.FC<TMainLayout> = ({}) => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
