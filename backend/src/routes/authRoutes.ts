import { Router } from "express";
import {
  register,
  login,
  getMe,
  verifyEmail,
} from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.get("/verify-email/:token", verifyEmail);

export default router;
