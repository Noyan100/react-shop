import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage/AboutPage";
import CartPage from "./pages/CartPage/CartPage";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import FAQPage from "./pages/FAQPage/FAQPage";
import Home from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/products" element={<MainLayout />}>
          <Route path="" element={<CollectionPage />} />
        </Route>
        <Route path="/products/:id" element={<MainLayout />}>
          <Route path="" element={<ProductPage />} />
        </Route>
        <Route path="/about" element={<MainLayout />}>
          <Route path="" element={<AboutPage />} />
        </Route>
        <Route path="/cart" element={<MainLayout />}>
          <Route path="" element={<CartPage />} />
        </Route>
        <Route path="/contact" element={<MainLayout />}>
          <Route path="" element={<ContactPage />} />
        </Route>
        <Route path="/faq" element={<MainLayout />}>
          <Route path="" element={<FAQPage />} />
        </Route>
        <Route path="/login" element={<MainLayout />}>
          <Route path="" element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<MainLayout />}>
          <Route path="" element={<RegisterPage />} />
        </Route>
        <Route path="/verify-email" element={<MainLayout />}>
          <Route path="" element={<VerifyEmailPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
