import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin routes (protected)
router.post("/", authenticateToken, isAdmin, createProduct);
router.put("/:id", authenticateToken, isAdmin, updateProduct);
router.delete("/:id", authenticateToken, isAdmin, deleteProduct);

export default router;
