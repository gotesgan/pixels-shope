import express from 'express';
const router = express.Router();

import {
  createOrder, // instead of sendData
  verifyPayment,
  fetchPaymentById,
  fetchPayments, // instead of CheckData
} from '../controllers/paymentConttoler.js';

import storeIdentifctionMiddleware from '../middleware/storeIdentifctionMiddleware.js';
import { verifyCustomer } from '../middleware/authtenicateCustomer.js';
import {
  authorizeStoreAccess,
  authenticate,
} from '../middleware/authenticationMiddleware.js';
// Routes

// ✅ Create Razorpay order
router.post('/', storeIdentifctionMiddleware, verifyCustomer, createOrder);

// ✅ Verify Razorpay payment
router.post('/verify', storeIdentifctionMiddleware, verifyPayment);
router.get('/', authenticate, authorizeStoreAccess, fetchPayments);

export default router;
