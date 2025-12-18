import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmails.js';
import logger from '../utils/logger.js'; 
import uploadImage from '../services/uploadServices.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    logger.info(`Fetching profile for user ID: ${req.user.id}`);
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      logger.warn(`User not found: ${req.user.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
    logger.info(`Successfully fetched profile for ${user.email}`);
  } catch (error) {
    logger.error(`❌ Failed to fetch profile: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

// Update Profile
// export const updateProfile = async (req, res) => {
//   try {
//     const { name, businessName, phone, email, logo, banner, gallery } = req.body;
//     logger.info(`Attempting to update profile for user ID: ${req.user.id}`);

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       logger.warn(`User not found: ${req.user.id}`);
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update fields
//     user.name = name || user.name;
//     user.businessName = businessName || user.businessName;
//     user.phone = phone || user.phone;
//     user.email = email || user.email;
//     user.logo = logo || user.logo;
//     user.banner = banner || user.banner;
//     user.gallery = gallery?.length ? gallery : user.gallery;

//     await user.save();

//     logger.info(`✅ Updated profile for user: ${user.email}`);

//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       businessName: user.businessName,
//       phone: user.phone,
//       logo: user.logo,
//       banner: user.banner,
//       gallery: user.gallery,
//     });
//   } catch (error) {
//     logger.error(`❌ Failed to update profile: ${error.message}`);
//     res.status(500).json({ message: 'Failed to update profile' });
//   }
// };

// export const updateProfile = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { name, businessName, phone, email, logo, banner, gallery } = req.body;
//     logger.info(`Attempting to update profile for user ID: ${req.user.id}`);

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       logger.warn(`User not found: ${req.user.id}`);
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update fields
//     user.name = name || user.name;
//     user.businessName = businessName || user.businessName;
//     user.phone = phone || user.phone;
//     user.email = email || user.email;

//     // Handle Logo upload
//     if (logo && logo !== user.logo) {
//       const uploadedLogo = await uploadImage(logo, "logos");
//       user.logo = uploadedLogo.url;
//     }

//     // Handle Banner upload
//     if (banner && banner !== user.banner) {
//       const uploadedBanner = await uploadImage(banner, "banners");
//       user.banner = uploadedBanner.url;
//     }

//     // Handle Gallery upload (multiple images)
//     if (gallery?.length) {
//       const uploadedGallery = [];
//       for (const img of gallery) {
//         const uploadedImg = await uploadImage(img, "gallery");
//         uploadedGallery.push(uploadedImg.url);
//       }
//       user.gallery = uploadedGallery;
//     }

//     await user.save();

//     logger.info(`✅ Updated profile for user: ${user.email}`);

//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       businessName: user.businessName,
//       phone: user.phone,
//       logo: user.logo,
//       banner: user.banner,
//       gallery: user.gallery,
//     });
//   } catch (error) {
//     logger.error(`❌ Failed to update profile: ${error.message}`);
//     res.status(500).json({ message: "Failed to update profile" });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, businessName, address } = req.body;

    const logo = req.files?.logo ? req.files.logo[0].path : null;
    const banner = req.files?.banner ? req.files.banner[0].path : null;
    const gallery = req.files?.gallery ? req.files.gallery.map(f => f.path) : [];

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        phone,
        businessName,
        address,
        ...(logo && { logo }),
        ...(banner && { banner }),
        ...(gallery.length && { gallery }),
      },
      { new: true }
    );
    console.log(user);
    res.json({ success: true, user });
  } catch (err) {
    console.error("Error",err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, businessName, email, password } = req.body;
    logger.info(`Attempting to register user with email: ${email}`);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Email already in use: ${email}`);
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = await User.create({ name, businessName, email, password });

    logger.info(`✅ Registered new user: ${email}`);

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        businessName: newUser.businessName,
        email: newUser.email,
        slug: newUser.slug
      },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    logger.error(`❌ Registration error: ${error.message}`);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`Login attempt for: ${email}`);

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      logger.warn(`Invalid login credentials for: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    logger.info(`✅ Login successful: ${email}`);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        businessName: user.businessName,
        slug: user.slug,
        logo: user.logo,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    logger.error(`❌ Login error: ${error.message}`);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    logger.info(`Password reset requested for: ${email}`);
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`User not found for email: ${email}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60;

    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const html = `
      <p>Hello ${user.name},</p>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `;

    await sendEmail(user.email, 'Password Reset', html);
    logger.info(`Reset link sent to: ${email}`);
    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    logger.error(`❌ Forgot password error: ${err.message}`);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    logger.info(`Reset password attempt with token: ${token}`);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      logger.warn(`Token invalid or expired: ${token}`);
      return res.status(400).json({ message: 'Token invalid or expired' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    logger.info(`✅ Password reset successful for: ${user.email}`);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    logger.error(`❌ Reset password error: ${err.message}`);
    res.status(500).json({ message: 'Could not reset password' });
  }
};