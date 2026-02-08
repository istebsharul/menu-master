import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY not set — LLM features will fail.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default openai;