import { Router } from "express";
const router = Router();
import { authenticate } from "../middleware/authenticationMiddleware.js";
import { register, login } from "../controllers/userAuthController.js";
import upload from "../middleware/multerConfig.js";
import {
  createStore,
  verifyAndSetupDomain,
} from "../controllers/storeContoller.js";
export default router;

router.post("/register", register);
router.post("/login", login);
router.post("/create-store", authenticate, upload.single("file"), createStore);
router.post("/verify-store", authenticate, verifyAndSetupDomain);
