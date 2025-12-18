import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

const userSchema = new mongoose.Schema({
  /* ----------------- AUTHENTICATION ----------------- */
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,

  /* ----------------- BUSINESS DETAILS ----------------- */
  businessName: { 
    type: String, 
    unique: true,  
    required: [true, 'This name is not available, Try different.'] 
  },
  phone: String,
  logo: String,
  banner: [String],         
  gallery: [String],
  slug: { type: String, unique: true, sparse: true }, 

  /* ----------------- SYSTEM / META DATA ----------------- */
  createdAt: { type: Date, default: Date.now },

  /* ----------------- PASSWORD RESET ----------------- */
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

/* ----------------- MIDDLEWARE ----------------- */
// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Auto-generate slug from businessName
userSchema.pre('save', function (next) {
  if (!this.slug || this.isModified('businessName')) {
    this.slug = slugify(this.businessName, { lower: true, strict: true });
  }
  next();
});

/* ----------------- METHODS ----------------- */
// Match password for login
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);