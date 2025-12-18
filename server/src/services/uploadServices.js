// src/services/uploadService.js
import cloudinary from '../config/cloudinary.js';
import logger from '../utils/logger.js'; // assuming you have logger.js

const uploadImage = async (filePath, folder = 'uploads') => {
  try {
    logger.info(`[UPLOAD_SERVICE] Uploading file: ${filePath} to folder: ${folder}`);

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto", // supports images, pdf, etc
    });

    logger.info("[UPLOAD_SERVICE] Upload success", {
      public_id: result.public_id,
      secure_url: result.secure_url,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    logger.error("[UPLOAD_SERVICE] Upload failed", {
      error: error.message,
      filePath,
      folder,
    });
    throw new Error("Image upload failed");
  }
};


export default uploadImage;