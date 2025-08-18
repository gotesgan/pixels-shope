import { Router } from "express";
const router = Router();
export default router;
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  createCategory,
  getAllCategories,
  getProductsByCategory,
  getProductById,
} from "../controllers/productController.js";
import storeIdentifctionMiddleware from "../middleware/storeIdentifctionMiddleware.js";

import {
  authenticate,
  authorizeStoreAccess,
} from "../middleware/authenticationMiddleware.js";
import upload from "../middleware/multerConfig.js";
router.post("/category", authenticate, authorizeStoreAccess, createCategory); // create category or subcategory
router.get("/category", storeIdentifctionMiddleware, getAllCategories); // get all
router.post(
  "/",
  authenticate,
  authorizeStoreAccess,
  upload.array("image"),
  createProduct
); // Create Product
router.get("/", storeIdentifctionMiddleware, getAllProducts); // List All
router.get("/:slug", storeIdentifctionMiddleware, getProductBySlug); // Get by slug
router.get(
  "/category/:slug",
  storeIdentifctionMiddleware,
  getProductsByCategory
);
router.get("/id/:id", storeIdentifctionMiddleware, getProductById);
