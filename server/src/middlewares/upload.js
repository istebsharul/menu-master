// src/middleware/upload.js
import multer from 'multer';
import storage from '../utils/cloudinaryStorage.js';

const upload = multer({ storage });

export default upload;