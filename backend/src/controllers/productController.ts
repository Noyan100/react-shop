import { Request, Response } from "express";
import Product from "../models/Product";
import { UserRole } from "../models/User";

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Create a new product (admin only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (req.user?.role !== UserRole.ADMIN) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    const productData = req.body;
    const newProduct = await Product.create(productData);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// Update a product (admin only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (req.user?.role !== UserRole.ADMIN) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    const { id } = req.params;
    const productData = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update(productData);

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete a product (admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (req.user?.role !== UserRole.ADMIN) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

// Add a review to a product
export const addReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, title, text, stars } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = {
      name,
      title,
      text,
      stars,
      date: new Date().toISOString().split("T")[0],
    };

    const updatedReviews = [...product.reviews, newReview];
    await product.update({ reviews: updatedReviews });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review" });
  }
};

// Delete a review from a product
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id, reviewIndex } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = [...product.reviews];
    const index = parseInt(reviewIndex);

    if (isNaN(index) || index < 0 || index >= reviews.length) {
      return res.status(400).json({ message: "Invalid review index" });
    }

    reviews.splice(index, 1);
    await product.update({ reviews });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Error deleting review" });
  }
};
