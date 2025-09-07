import express from 'express';
import upload from '../middleware/multerConfig.js';
import {
  CreateHeroSection,
  deleteHeroSection,
  fetchHerosection,
} from '../controllers/heroSectionContoler.js';
import storeIdentifctionMiddleware from '../middleware/storeIdentifctionMiddleware.js';
import {
  createLegalDocument,
  getLegalDocument,
  updateLegalDocument,
  deleteLegalDocument,
  listLegalDocuments,
} from '../controllers/policyController.js';
import {
  upsertAboutPage,
  fetchAboutPage,
} from '../controllers/AboutPageConttoler.js';
import {
  createContactPage,
  fetchContactPage,
  createContactSubmission,
  updateSubmissionStatus,
  fetchSubmissions,
  updateContactPage,
} from '../controllers/contactController.js';
import {
  authenticate,
  authorizeStoreAccess,
} from '../middleware/authenticationMiddleware.js';

const router = express.Router();
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
} from '../controllers/BlogControllers.js';
import { getFaq, createFaq, deleteFaq } from '../controllers/faqControllers.js';
// Legal Document (Policy) Routes
router.post(
  '/legal-documents',
  authenticate,
  authorizeStoreAccess,
  createLegalDocument,
);
router.get(
  '/legal-documents/:type',
  authenticate,
  authorizeStoreAccess,
  getLegalDocument,
);
router.put(
  '/legal-documents/:id',
  authenticate,
  authorizeStoreAccess,
  updateLegalDocument,
);
router.delete(
  '/legal-documents/:id',
  authenticate,
  authorizeStoreAccess,
  deleteLegalDocument,
);
router.get(
  '/legal-documents',
  authenticate,
  authorizeStoreAccess,
  listLegalDocuments,
);

// About Page Routes
// In uiRoute.js
router.post(
  '/about-page',
  upload.any(),
  authenticate,
  authorizeStoreAccess,
  upsertAboutPage,
);
router.get('/about-page', authenticate, authorizeStoreAccess, fetchAboutPage);

// Contact Page Routes
router.post(
  '/contact-page',
  authenticate,
  authorizeStoreAccess,
  createContactPage,
);
router.get('/contact-page', storeIdentifctionMiddleware, fetchContactPage);
router.put(
  '/contact-page',
  authenticate,
  authorizeStoreAccess,
  updateContactPage,
);

// Contact form Submission Routes
router.post('/contact-submissions', authenticate, createContactSubmission);
router.put(
  '/contact-submissions/:id/status',
  authenticate,
  authorizeStoreAccess,
  updateSubmissionStatus,
);
router.get(
  '/contact-submissions',
  authenticate,
  authorizeStoreAccess,
  fetchSubmissions,
);

// hero section routes
router.post(
  '/create-hero-section',
  authenticate,
  authorizeStoreAccess,
  upload.single('file'),
  CreateHeroSection,
);
router.get(
  '/create-hero-section',
  authenticate,
  authorizeStoreAccess,

  fetchHerosection,
);
router.delete(
  '/create-hero-section/:id',
  authenticate,
  authorizeStoreAccess,

  deleteHeroSection,
);
// Blog Routes
router.post('/blogs', authenticate, authorizeStoreAccess, createBlog);
router.get('/blogs/:id', storeIdentifctionMiddleware, getBlogById);

router.put('/blogs/:id', authenticate, authorizeStoreAccess, updateBlog);

router.delete('/blogs/:id', authenticate, authorizeStoreAccess, deleteBlog);

// FAQ Routes
router.get('/faqs', authenticate, authorizeStoreAccess, getFaq);

router.post('/faqs', authenticate, authorizeStoreAccess, createFaq);

// router.put('/faqs/:id', authenticate, authorizeStoreAccess, updateFaq);

router.delete('/faqs/:id', authenticate, authorizeStoreAccess, deleteFaq);

export default router;
