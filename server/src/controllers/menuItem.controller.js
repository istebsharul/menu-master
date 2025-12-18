import MenuItem from '../models/MenuItem.js';
import logger from '../utils/logger.js';
// import uploadImage from '../services/uploadServices.js';
import upload from '../middlewares/upload.js';

export const createItem = async (req, res) => {
  try {
    logger.info('Hit createItem endpoint');
    console.log(req.body);
    const userId = req.user._id;
    const { categoryId, name, description, price, available } = req.body;

    if (!categoryId || !name || !price) {
      logger.warn(`Validation failed for user ${userId}: Missing fields`);
      return res.status(400).json({ message: 'Category, name and price are required' });
    }

    logger.info(`File uploaded: ${req.file?.path}`);
    const imageUrl = req.file?.path || '';

    const item = new MenuItem({
      userId,
      categoryId,
      name,
      description,
      price,
      imageUrl,
      available: available !== undefined ? available : true,
    });

    await item.save();
    logger.info(`Item created by user ${userId}: ${item._id}`);
    res.status(201).json(item);
  } catch (error) {
    logger.error(`Error creating item for user ${req.user._id}: ${error.message}`);
    res.status(500).json({ message: 'Failed to create menu item' });
  }
};

export const getItemsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const items = await MenuItem.find({ userId }).sort({ createdAt: -1 });

    logger.info(`Fetched ${items.length} items for user ${userId}`);
    res.json(items);
  } catch (error) {
    logger.error(`Error fetching items for user ${req.user._id}: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;
    const { categoryId, name, price, description, available, tags } = req.body;

    console.log("Tags", tags);

    let imageUrl;
    if (req.file) {
      const uploaded = await uploadImage(req.file.path, "menu-items");
      imageUrl = uploaded.url;
    } else {
      logger.info("No file to upload");
    }

    // Build update object dynamically
    const updateData = {};
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (available !== undefined) updateData.available = available;
    if (tags !== undefined) {
      // updateData.tags = Array.isArray(tags) ? tags : [tags];
      const normalized = Array.isArray(tags) ? tags : String(tags).split(',');

      updateData.tags = normalized
        .map(t => t.trim())
        .filter(t => t !== "");
    } // ensure array
    if (imageUrl) updateData.imageUrl = imageUrl;

    console.log("[UPDATE_ITEM] Final update data:", updateData);

    const item = await MenuItem.findOneAndUpdate(
      { _id: itemId, userId },
      updateData,
      { new: true }
    );

    if (!item) {
      console.warn(`[UPDATE_ITEM] Item not found: ${itemId}`);
      return res.status(404).json({ message: "Item not found" });
    }

    console.log("[UPDATE_ITEM] Update successful:", item);

    res.json(item);
  } catch (error) {
    console.error("[UPDATE_ITEM] Error occurred:", error);
    res.status(500).json({ message: "Failed to update menu item" });
  }
};


// export const updateItem = async (req, res) => {
//   try {
//     console.info("Req Body", req.body);
//     const userId = req.user._id;
//     const itemId = req.params.id;
//     const { categoryId, name, price, description, available } = req.body;

//     console.log(`[UPDATE_ITEM] User: ${userId}, Item: ${itemId}`);
//     console.log("[UPDATE_ITEM] Incoming data:", req.body);

//     let imageUrl;
//     if (req.file) {
//       const uploaded = await uploadImage(req.file.path, 'menu-items');
//       imageUrl = uploaded.url;
//     }else{
//       logger.info("No file to upload");
//     }

//     // Build update object dynamically
//     const updateData = {};
//     if (categoryId !== undefined) updateData.categoryId = categoryId;
//     if (name !== undefined) updateData.name = name;
//     if (price !== undefined) updateData.price = price;
//     if (description != undefined ) updateData.description = description;
//     if (available !== undefined) updateData.available = available;
//     if (imageUrl) updateData.imageUrl = imageUrl;

//     console.log("[UPDATE_ITEM] Final update data:", updateData);

//     const item = await MenuItem.findOneAndUpdate(
//       { _id: itemId, userId },
//       updateData,
//       { new: true }
//     );

//     if (!item) {
//       console.warn(`[UPDATE_ITEM] Item not found: ${itemId}`);
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     console.log("[UPDATE_ITEM] Update successful:", item);

//     res.json(item);
//   } catch (error) {
//     console.error("[UPDATE_ITEM] Error occurred:", error);
//     res.status(500).json({ message: 'Failed to update menu item' });
//   }
// };

export const deleteItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;

    const item = await MenuItem.findOneAndDelete({ _id: itemId, userId });

    if (!item) {
      logger.warn(`Delete failed: Item not found ${itemId} for user ${userId}`);
      return res.status(404).json({ message: 'Item not found' });
    }

    logger.info(`Item deleted: ${itemId} by user ${userId}`);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    logger.error(`Error deleting item ${req.params.id} for user ${req.user._id}: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete item' });
  }
};

import { processMenuImage } from '../services/menu.service.js';

/**
 * Upload menu images -> GCS -> OCR -> LLM -> Save menu items
 */
export const uploadAndProcessMenu = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!req.gcsFiles || !req.gcsFiles.length) {
      const err = new Error('No files found after upload');
      err.status = 400;
      throw err;
    }

    let allItems = [];

    for (const file of req.gcsFiles) {
      // Use the GCS URI for OCR processing
      const items = await processMenuImage(userId, file.gcsUri);
      allItems = allItems.concat(items);
    }

    res.status(201).json({
      message: 'Menu processed successfully',
      items: allItems
    });
  } catch (err) {
    next(err);
  }
};