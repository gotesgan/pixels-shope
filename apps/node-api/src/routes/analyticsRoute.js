import { Router } from 'express';
import {
  getStoreAnalytics,
  getStoreSummary,
  getCustomerAnalytics,
} from '../controllers/getCustomerAnalytics.js';
import {
  authenticate,
  authorizeStoreAccess,
} from '../middleware/authenticationMiddleware.js';
const router = Router();

router.get(
  '/customer',
  authenticate,
  authorizeStoreAccess,
  getCustomerAnalytics
);
router.get('/bussines', authenticate, authorizeStoreAccess, getStoreAnalytics);
router.get('/dashbaord', authenticate, authorizeStoreAccess, getStoreSummary);
export default router;
