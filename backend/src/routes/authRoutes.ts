import { Router } from "express";
import {
  register,
  login,
  getMe,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.get("/verify-email/:token", verifyEmail);
router.post("/change-password", auth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
