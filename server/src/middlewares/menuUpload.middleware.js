import multer from 'multer';
import { v4 as uuid } from 'uuid';
import storage from '../config/storage.js';
import logger from '../utils/logger.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

export const uploadToMemory = upload.array('files', 10); // allow multiple images

export const pushToGCS = async (req, _res, next) => {
  try {
    if (!req.files || !req.files.length) {
      const err = new Error('No files uploaded');
      err.status = 400;
      throw err;
    }

    const uploads = await Promise.all(
      req.files.map(async (file) => {
        const ext = (file.originalname.split('.').pop() || 'jpg').toLowerCase();
        const gcsName = `menus/${uuid()}.${ext}`;
        const blob = bucket.file(gcsName);

        await blob.save(file.buffer, {
          contentType: file.mimetype,
          resumable: false,
          public: false
        });

        logger.info(`Uploaded to GCS: ${gcsName}`);
        return {
          gcsUri: `gs://${process.env.GCS_BUCKET}/${gcsName}`,
          bucket: process.env.GCS_BUCKET,
          name: gcsName,
          contentType: file.mimetype,
          size: file.size
        };
      })
    );

    req.gcsFiles = uploads; // [{gcsUri, ...}]
    next();
  } catch (err) {
    next(err);
  }
};