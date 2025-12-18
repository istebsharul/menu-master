import client from '../config/cloudVision.js';
import logger from '../utils/logger.js';

/**
 * Extract text from an image using Google Vision API
 * @param {string} imageUrl - public URL or local path of the image
 * @returns {Promise<string>} - extracted text
 */
export const extractTextFromImage = async (imageUrl) => {
  try {
    const [result] = await client.textDetection(imageUrl);
    const detections = result.textAnnotations;
    const text = detections.length ? detections[0].description : '';
    return text;
  } catch (error) {
    logger.error('OCR extraction failed:', error);
    throw new Error('Failed to extract text from image');
  }
};