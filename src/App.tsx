import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage/AboutPage";
import CartPage from "./pages/CartPage/CartPage";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import FAQPage from "./pages/FAQPage/FAQPage";
import Home from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ChangePasswordForm from "./pages/ProfilePage/components/ChangePasswordForm";
import PasswordRecoveryForm from "./pages/LoginPage/components/PasswordRecoveryForm";
import ResetPasswordForm from "./pages/LoginPage/components/ResetPasswordForm";
import Loading from "./components/Loading/Loading";
import AddProductPage from "./pages/AddProductPage/AddProductPage";

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
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
      <Route path="/add-product" element={<MainLayout />}>
        <Route path="" element={<AddProductPage />} />
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
      <Route path="/forgot-password" element={<MainLayout />}>
        <Route path="" element={<PasswordRecoveryForm />} />
      </Route>
      <Route path="/reset-password" element={<MainLayout />}>
        <Route path="" element={<ResetPasswordForm />} />
      </Route>
      <Route path="/register" element={<MainLayout />}>
        <Route path="" element={<RegisterPage />} />
      </Route>
      <Route path="/verify-email" element={<MainLayout />}>
        <Route path="" element={<VerifyEmailPage />} />
      </Route>
      <Route path="/profile" element={<MainLayout />}>
        <Route
          path=""
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="change-password"
          element={user ? <ChangePasswordForm /> : <Navigate to="/login" />}
        />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
