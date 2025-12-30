import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createCategory, updateCategory, getCategories, deleteCategory } from '../controllers/menuCategory.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createCategory);
router.patch('/:id', updateCategory)
router.get('/', getCategories);
router.delete('/:id', deleteCategory);

export default router;