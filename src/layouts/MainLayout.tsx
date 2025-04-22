import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import s from "./MainLayout.module.scss";

type TMainLayout = {};

const MainLayout: React.FC<TMainLayout> = ({}) => {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
