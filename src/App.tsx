import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import Home from './pages/HomePage/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/collection" element={<MainLayout />}>
        <Route path="" element={<CollectionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
