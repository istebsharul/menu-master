import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createItem, getItemsByUser, updateItem, deleteItem, uploadAndProcessMenu, updateAvailability } from '../controllers/menuItem.controller.js';
import upload from '../middlewares/upload.js';
import { uploadToMemory, pushToGCS } from '../middlewares/menuUpload.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', upload.single('file'), createItem);
router.patch('/:id', upload.single('file'), updateItem);
router.patch('/availability/:id', updateAvailability);
router.get('/', getItemsByUser);
router.delete('/:id', deleteItem);


// Upload images, push to GCS, then process via OCR + LLM
router.post(
  '/upload',
  uploadToMemory,
  pushToGCS,
  uploadAndProcessMenu
);

export default router;