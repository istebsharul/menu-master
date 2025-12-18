import mongoose from 'mongoose';

const menuCategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  image: {
    type: String, // URL of uploaded image (Cloudinary, S3, etc.)
    default: null // or you can use a placeholder image URL
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MenuCategory', menuCategorySchema);
