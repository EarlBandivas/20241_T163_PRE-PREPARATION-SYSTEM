import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    email: { 
      type: String, 
      required: true, 
      unique: true,  // Ensures email is unique in the database
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email format validation
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const User = mongoose.model('User', userSchema);

export default User;