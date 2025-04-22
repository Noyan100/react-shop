import React from "react";
import RegisterForm from "./components/RegisterForm";
import styles from "./RegisterPage.module.scss";

export default function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <h1>Create an Account</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
