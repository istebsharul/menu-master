// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import menuCategoryRoutes from './routes/menuCategory.routes.js';
import menuItemRoutes from './routes/menuItem.routes.js';
import publicMenuRoutes from './routes/public/menuRoutes.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', menuCategoryRoutes);
app.use('/api/items', menuItemRoutes);


// Customer Routes
app.use('/api/public',publicMenuRoutes)

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});