// import express from "express";

// import { getProducts } from "../controllers/productController.js";

// const router = express.Router();

// router.get("/", getProducts);

// export default router;

import express from "express";

import {
  getProducts,
  getProductsPerCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/products-per-category", getProductsPerCategory);

export default router;
