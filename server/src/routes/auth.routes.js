import express from 'express';
import { loginUser, registerUser, forgotPassword, resetPassword, getProfile, updateProfile } from '../controllers/user.controllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 10 },
    { name: "gallery", maxCount: 10 },
]), updateProfile);


export default router;