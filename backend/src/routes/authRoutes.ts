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
import {
  checkIpBan,
  incrementLoginAttempts,
  incrementRegistrationAttempts,
} from "../middleware/rateLimitMiddleware";

const router = Router();

// Public routes with IP tracking
router.post("/register", checkIpBan, incrementRegistrationAttempts, register);
router.post("/login", checkIpBan, incrementLoginAttempts, login);
router.post("/forgot-password", checkIpBan, forgotPassword);
router.post("/reset-password", checkIpBan, resetPassword);
router.get("/verify-email/:token", checkIpBan, verifyEmail);
router.post("/resend-verification", checkIpBan, resendVerificationEmail);

// Protected routes
router.get("/me", auth, getMe);
router.post("/change-password", auth, changePassword);

export default router;
