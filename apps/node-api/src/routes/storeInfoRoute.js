import { Router } from 'express';
import upload from '../middleware/multerConfig.js';
import {
  getStoreDetails,
  updateStoreDetails,
} from '../controllers/storeContoller.js';
import {
  authenticate,
  authorizeStoreAccess,
} from '../middleware/authenticationMiddleware.js';

const router = Router();

router.get('/store-info', authenticate, authorizeStoreAccess, getStoreDetails);
router.put(
  '/store-info',
  authenticate,
  authorizeStoreAccess,
  upload.single('file'),
  updateStoreDetails
);

export default router;
