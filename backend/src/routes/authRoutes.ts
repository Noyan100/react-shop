import { Router } from "express";
import {
  register,
  login,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

// Protected routes
router.get("/me", auth, getMe);
router.post("/change-password", auth, changePassword);

export default router;
