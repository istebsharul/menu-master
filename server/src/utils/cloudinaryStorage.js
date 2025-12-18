// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary.js';
// import logger from './logger.js'; // adjust path if needed
// import multer from 'multer';

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     // Get restaurant ID (you can get it from req.user or req.body)
//     const restaurantId = req.user?.restaurantId || req.body.restaurantId || "default";

//     // Decide folder based on file.fieldname
//     let folderName = "others";
//     if (file.fieldname === "logo") folderName = "logo";
//     else if (file.fieldname === "banner") folderName = "banner";
//     else if (file.fieldname === "gallery") folderName = "gallery";
//     else if (file.fieldname === "menu") folderName = "menu";

//     logger.info(`[UPLOAD] Uploading file: ${file.originalname} to ${restaurantId}/${folderName}`);

//     return {
//       folder: `restaurants/${restaurantId}/${folderName}`, // 👈 dynamic folder per restaurant
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [{ width: 800, height: 800, crop: "limit" }],
//       public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
//     };
//   },
// });

// const upload = multer({ storage });

// export default upload;

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import logger from './logger.js'; // Adjust path if needed

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    logger.info(`Uploading file: ${file.originalname}`);
    return {
      folder: 'menu_items',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

export default storage;