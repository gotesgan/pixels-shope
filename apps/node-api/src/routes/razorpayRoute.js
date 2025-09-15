import express from 'express';
import {
  createRazorpay,
  toggleRazorpayStatus,
  updateRazorpay,
  deleteRazorpay,
  getRazorpay,
} from '../controllers/razorpayController.js';

import {
  authenticate,
  authorizeStoreAccess,
} from '../middleware/authenticationMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate, authorizeStoreAccess);

// @route   POST /api/v1/razorpay
router.post('/', createRazorpay);

// @route   GET /api/v1/razorpay
router.get('/', getRazorpay);

// @route   PUT /api/v1/razorpay
router.put('/', updateRazorpay);

// @route   DELETE /api/v1/razorpay
router.delete('/', deleteRazorpay);

// @route   PATCH /api/v1/razorpay/toggle-status
router.patch('/toggle-status', toggleRazorpayStatus);

export default router;
