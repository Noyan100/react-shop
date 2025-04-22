import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    console.log("Auth context:", auth);
  }, [auth]);

  if (!auth) {
    console.error("Auth context is not available");
    return <div>Error: Auth context is not available</div>;
  }

  const { register } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    console.log("Submitting form with:", { email, username });
    try {
      const response = await register(email, password, username);
      console.log("Registration successful");
      setSuccess(
        response.message ||
          "Registration successful! Please check your email to verify your account."
      );
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to the server. Please make sure the backend server is running."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Register</h1>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="username">
              Username (optional)
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={styles.registerButton}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
