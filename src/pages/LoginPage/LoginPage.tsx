import React from "react";
import LoginForm from "./components/LoginForm";
import PasswordRecoveryForm from "./components/PasswordRecoveryForm";
import NewPasswordForm from "./components/NewPasswordForm";

export default function App() {
  return (
    <div>
      <LoginForm />
      <PasswordRecoveryForm />
      <NewPasswordForm />
    </div>
  );
}
