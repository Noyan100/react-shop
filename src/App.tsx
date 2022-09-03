import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AboutPage from './pages/AboutPage/AboutPage';
import CartPage from './pages/CartPage/CartPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import Home from './pages/HomePage/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/products" element={<MainLayout />}>
        <Route path="" element={<CollectionPage />} />
      </Route>
      <Route path="/about" element={<MainLayout />}>
        <Route path="" element={<AboutPage />} />
      </Route>
      <Route path="/cart" element={<MainLayout />}>
        <Route path="" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
