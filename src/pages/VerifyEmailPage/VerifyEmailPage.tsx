import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/authService";
import styles from "./VerifyEmailPage.module.scss";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided");
      return;
    }

    const verify = async () => {
      try {
        const response = await verifyEmail(token);
        setStatus("success");
        setMessage(response.message);
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Failed to verify email. Please try again."
        );
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className={styles.verifyEmailPage}>
      <div className={styles.verifyEmailContainer}>
        <h1>Email Verification</h1>
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && (
          <div className={styles.successMessage}>
            <p>{message}</p>
            <p>Redirecting to login page...</p>
          </div>
        )}
        {status === "error" && (
          <div className={styles.errorMessage}>
            <p>{message}</p>
            <button onClick={() => navigate("/register")}>
              Back to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
