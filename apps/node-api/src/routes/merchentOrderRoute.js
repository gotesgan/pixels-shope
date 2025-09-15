import { Router } from 'express';
const router = Router();
export default router;
import {
  fetchOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import {
  authenticate,
  authorizeStoreAccess,
} from '../middleware/authenticationMiddleware.js';
router.get('/', authenticate, authorizeStoreAccess, fetchOrder); // List All
router.patch(
  '/changeStatus/:id',
  authenticate,
  authorizeStoreAccess,
  updateOrderStatus
);
