import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createCategory, getCategories, deleteCategory } from '../controllers/menuCategory.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createCategory);
router.get('/', getCategories);
router.delete('/:id', deleteCategory);

export default router;