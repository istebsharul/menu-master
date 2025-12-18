import openai from '../config/llm.js';
import logger from '../utils/logger.js';

/**
 * Format extracted menu text into structured JSON using LLM
 * @param {string} rawText - OCR extracted text
 * @returns {Promise<Object>} - formatted menu items
 */
export const formatMenuWithLLM = async (rawText) => {
  try {
    const prompt = `
      You are a menu parser. 
      Input: ${rawText}
      Output: JSON array with each item containing { name, description, price, category }.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    });

    const message = response.choices[0].message.content;
    return JSON.parse(message); // make sure LLM always returns valid JSON
  } catch (error) {
    logger.error('LLM formatting failed:', error);
    throw new Error('Failed to format menu with LLM');
  }
};