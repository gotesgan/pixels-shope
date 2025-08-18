import { Router } from "express";
import { CreateHeroSection } from "../controllers/heroSectionContoler.js";
import storeIdentifctionMiddleware from "../middleware/storeIdentifctionMiddleware.js";
import upload from "../middleware/multerConfig.js";
 import { authenticate, authorizeStoreAccess } from "../middleware/authenticationMiddleware.js";


const router = Router();

router.post("/", authenticate,authorizeStoreAccess,upload.single("file"), CreateHeroSection);

export default router;
