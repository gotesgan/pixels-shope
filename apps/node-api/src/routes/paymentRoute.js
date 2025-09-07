import express from 'express';
const router = express.Router();

import { sendData, CheckData } from '../controllers/paymentConttoler.js';
import storeIdentifctionMiddleware from '../middleware/storeIdentifctionMiddleware.js';
import { verifyCustomer } from '../middleware/authtenicateCustomer.js';

// Routes

// POST /api/payment — Send payment data (with store + customer verification)
router.post('/', storeIdentifctionMiddleware, verifyCustomer, sendData);

// POST /api/payment/check — Just check data (no verification middleware)
router.get(
  '/check/:merchantTransactionId/:id',
  storeIdentifctionMiddleware,

  CheckData,
);

export default router;
