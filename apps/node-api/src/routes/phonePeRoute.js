import express from "express";
import {
  createPhonePe,
  togglePhonePeStatus,
  updatePhonePe,
  deletePhonePe,
  getPhonePe,
} from "../controllers/phonepeContoroller.js"; // <-- make sure the filename is correct

import {
  authenticate,
  authorizeStoreAccess,
} from "../middleware/authenticationMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes below
router.use(authenticate, authorizeStoreAccess);

// @route   POST /api/phonepe
// @desc    Create PhonePe config
router.post("/", createPhonePe);

// @route   GET /api/phonepe
// @desc    Get PhonePe config
router.get("/", getPhonePe);

// @route   PUT /api/phonepe
// @desc    Update PhonePe config
router.put("/", updatePhonePe);

// @route   DELETE /api/phonepe
// @desc    Delete PhonePe config
router.delete("/", deletePhonePe);

// @route   PATCH /api/phonepe/toggle-status
// @desc    Toggle PhonePe active status
router.patch("/toggle-status", togglePhonePeStatus);

export default router;
