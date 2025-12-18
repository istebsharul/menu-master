import MenuCategory from '../models/MenuCategory.js';
import logger from '../utils/logger.js';

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    if (!name) {
      logger.warn('❌ Category creation failed: name is missing');
      return res.status(400).json({ message: 'Name is required' });
    }

    const category = new MenuCategory({ userId, name });
    await category.save();

    logger.info(`✅ Category created: ${category.name} by user ${userId}`);
    res.status(201).json(category);
  } catch (error) {
    logger.error(`❌ Error creating category: ${error.message}`);
    res.status(500).json({ message: 'Failed to create category' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const userId = req.user._id;
    const categories = await MenuCategory.find({ userId }).sort({ createdAt: -1 });

    logger.info(`📦 Fetched ${categories.length} categories for user ${userId}`);
    res.json(categories);
  } catch (error) {
    logger.error(`❌ Error fetching categories: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const userId = req.user._id;
    const categoryId = req.params.id;

    const category = await MenuCategory.findOneAndDelete({ _id: categoryId, userId });

    if (!category) {
      logger.warn(`⚠️ Attempted to delete non-existent category ID: ${categoryId} by user ${userId}`);
      return res.status(404).json({ message: 'Category not found' });
    }

    logger.info(`🗑️ Category deleted: ${category.name} (ID: ${categoryId}) by user ${userId}`);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    logger.error(`❌ Error deleting category: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};
