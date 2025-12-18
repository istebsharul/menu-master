import { extractTextFromImage } from './ocr.services.js';
import { formatMenuWithLLM } from './llm.service.js';
import MenuItem from '../models/MenuItem.js';

/**
 * Process menu image:
 * 1. Extract text via OCR
 * 2. Format text via LLM
 * 3. Save items in DB
 */
export const processMenuImage = async (userId, imageUrl) => {
  // Step 1: OCR
  const rawText = await extractTextFromImage(imageUrl);

  // Step 2: LLM formatting
  const formattedItems = await formatMenuWithLLM(rawText);

  // Step 3: Save each item to DB
  const savedItems = [];
  for (const item of formattedItems) {
    const menuItem = new MenuItem({
      userId,
      categoryId: item.categoryId || null, // if LLM can detect category
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl
    });
    savedItems.push(await menuItem.save());
  }

  return savedItems;
};