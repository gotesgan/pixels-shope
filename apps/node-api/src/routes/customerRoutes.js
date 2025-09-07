import express from 'express';
import {
  registerCustomer,
  loginCustomer,
  getShippingAddresses,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} from '../controllers/customerAuthController.js';
import fetchOrder from '../controllers/orderController.js';
import storeIdentifctionMiddleware from '../middleware/storeIdentifctionMiddleware.js';
import { verifyCustomer } from '../middleware/authtenicateCustomer.js';

const router = express.Router();

// ✅ Apply store identification globally to all customer routes
router.use(storeIdentifctionMiddleware);

// Public Routes
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

// ✅ Protected routes (customer must be authenticated)
router.post('/Shipping', verifyCustomer, createShippingAddress);
router.get('/Shipping', verifyCustomer, getShippingAddresses);
router.put('/Shipping/:id', verifyCustomer, updateShippingAddress);
router.delete('/Shipping/:id', verifyCustomer, deleteShippingAddress);

router.get('/order', verifyCustomer, fetchOrder);

export default router;
