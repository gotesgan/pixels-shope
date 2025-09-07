import { Router } from 'express';
const router = Router();
export default router;
import {
  createProduct,
  deleteCategory,
  getAllProducts,
  getProductBySlug,
  createCategory,
  getAllCategories,
  getProductsByCategory,
  getProductById,
} from '../controllers/productController.js';
import storeIdentifctionMiddleware from '../middleware/storeIdentifctionMiddleware.js';

import {
  authenticate,
  authorizeStoreAccess,
} from '../middleware/authenticationMiddleware.js';
import upload from '../middleware/multerConfig.js';
router.post('/category', authenticate, authorizeStoreAccess, createCategory);
router.delete(
  '/category/:id',
  authenticate,
  authorizeStoreAccess,
  deleteCategory
); // create category or subcategory
router.get('/category', storeIdentifctionMiddleware, getAllCategories);

router.get('/categorys', authenticate, authorizeStoreAccess, getAllCategories); // get all
router.post(
  '/',
  authenticate,
  authorizeStoreAccess,
  upload.array('image'),
  createProduct
); // Create Product
router.get('/', storeIdentifctionMiddleware, getAllProducts);
router.get('/admin', authenticate, authorizeStoreAccess, getAllProducts); // List All
router.get('/:slug', storeIdentifctionMiddleware, getProductBySlug); // Get by slug
router.get(
  '/category/:slug',
  storeIdentifctionMiddleware,
  getProductsByCategory
);
router.get('/id/:id', storeIdentifctionMiddleware, getProductById);
