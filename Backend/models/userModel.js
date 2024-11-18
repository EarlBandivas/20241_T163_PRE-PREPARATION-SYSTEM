import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, default: 'user' },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  hasSetPassword: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
export default User;
