import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  deleteReview,
} from "../controllers/productController";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", addReview);
router.delete(
  "/:id/reviews/:reviewIndex",
  authenticateToken,
  isAdmin,
  deleteReview
);

// Admin routes (protected)
router.post("/", authenticateToken, isAdmin, createProduct);
router.put("/:id", authenticateToken, isAdmin, updateProduct);
router.delete("/:id", authenticateToken, isAdmin, deleteProduct);

export default router;
