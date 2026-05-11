import express from "express";

import {
  getProductsPerCategory,
  getTopReviewedProducts,
  getCategoryAverageRating,
} from "../controllers/analyticsController.js";

const router = express.Router();

// Products Per Category
router.get("/products-per-category", getProductsPerCategory);

// Top Reviewed Products
router.get("/top-reviewed-products", getTopReviewedProducts);

// Category Average Rating
router.get("/category-average-rating", getCategoryAverageRating);

export default router;
