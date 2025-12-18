// import OpenAI from 'openai';
// import dotenv from 'dotenv';
// import logger from '../utils/logger.js';

// dotenv.config();

// let openai;

// if (!process.env.OPENAI_API_KEY) {
//   logger.warn('OPENAI_API_KEY not set — LLM features will fail.');
// } else {
//   try {
//     openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     logger.info('OpenAI client initialized successfully.');

//     (async () => {
//       try {
//         const models = await openai.models.list();
//         logger.info('Available OpenAI models:');
//         models.data.forEach((model) => logger.info(`- ${model.id}`));

//         // ✅ Test sending "Hi" safely
//         const testResponse = await openai.chat.completions.create({
//           model: 'gpt-3.5-turbo', // use the latest chat model from your list
//           messages: [{ role: 'user', content: 'Hi' }],
//           temperature: 0
//         });

//         const message = testResponse.choices[0].message.content;
//         logger.info('LLM test response: ' + message);

//       } catch (err) {
//         // log the full error object for debugging
//         logger.error('Failed during model listing or test:', err);
//       }
//     })();

//   } catch (err) {
//     logger.error('Failed to initialize OpenAI client:', err);
//   }
// }

// export default openai;

import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY not set — LLM features will fail.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default openai;