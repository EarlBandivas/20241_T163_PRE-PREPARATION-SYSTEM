// controllers/userController.js
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch'; // For Google OAuth validation
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;  // Store your Google Client ID in .env
const client = new OAuth2Client(CLIENT_ID);

// Traditional login (email/password)
export const login = async (req, res) => {
  const { email, password, googleToken } = req.body;

  try {
    // If Google token is provided, validate and login via Google
    if (googleToken) {
      const googleUser = await verifyGoogleToken(googleToken);
      if (googleUser) {
        let user = await User.findOne({ email: googleUser.email });
        if (!user) {
          user = await User.create({
            email: googleUser.email,
            name: googleUser.name,
            role: 'user', // default to 'user', you can adjust this logic
          });
        }

        const token = generateToken(user); // Generate JWT token for the user
        return res.status(200).json({ 
          token, 
          role: user.role, 
          user: { id: user._id, email: user.email, role: user.role } 
        });
      } else {
        return res.status(400).json({ message: 'Invalid Google token' });
      }
    }

    // Traditional email/password login
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user); // Generate JWT token for the user
    res.status(200).json({
      message: 'Login successful',
      token,  // Send the token to the client
      user: { // Send the user data
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Helper function to verify Google token
const verifyGoogleToken = async (token) => {
  try {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error('Invalid Google token');
    }

    return data; // Return user data if valid, else null
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Google token verification failed');
  }
};

// Helper function to generate JWT token
const generateToken = (user) => {
  try {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Error generating token');
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) return res.status(404).send('User not found.');
    res.status(200).json(user); // Return user data
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ message: 'Error retrieving user', error: err.message });
  }
};

// Logout functionality (JWT is stateless, this is just for consistency)
export const logout = (req, res) => {
  // Invalidate the token on the client side by clearing it from the frontend
  // Since JWT is stateless, there's nothing to clear on the backend
  res.status(200).json({ message: 'Logged out successfully' });
};

// Google OAuth authentication
export const authenticateGoogleUser = async (req, res) => {
  try {
    const { token } = req.body; // The token sent by the frontend

    // Verify the token using Google's library
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the Google Client ID to verify the token
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // Check if the user already exists in your database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate JWT for the authenticated user
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Google Authentication successful',
      token: jwtToken, // Send the token to the frontend
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during Google authentication:', error);
    res.status(500).json({ message: 'Authentication failed', error: error.message });
  }
};
