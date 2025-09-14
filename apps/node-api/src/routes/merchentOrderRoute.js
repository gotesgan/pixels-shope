import { Router } from 'express';
const router = Router();
export default router;
import fetchOrder from '../controllers/orderController.js';
import {
  authenticate,
  authorizeStoreAccess,
} from '../middleware/authenticationMiddleware.js';
router.get('/', authenticate, authorizeStoreAccess, fetchOrder); // List All
