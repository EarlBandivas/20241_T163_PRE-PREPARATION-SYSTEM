// controllers/userController.js
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Ensure your JWT_SECRET is set in environment variables
      { expiresIn: '1h' }
    );

    // Send the response with the token and user role
    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) return res.status(404).send('User not found.');
    res.status(200).json(user); // Return user data
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

export const createPreReport = (req, res) => {
  // Logic for creating a PRE report (simplified here)
  const newReport = {
    id: req.body.id, // Assuming the report details are in the request body
    status: 'Draft',
  };
  res.status(201).json(newReport);
};

export const submitPreReport = (req, res) => {
  const report = {
    id: req.params.id, // Get report by ID
    status: 'Submitted',
  };
  res.status(200).json({ message: 'Report submitted for approval', report });
};

export const getPendingReports = (req, res) => {
  // Example of fetching pending reports for a user
  const pendingReports = [{ id: 1, status: 'Submitted' }];
  res.status(200).json(pendingReports);
};

export const authenticateGoogleUser = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Received login attempt from:', email);

    // Find user by email
    const testUser = await User.findOne({ email });
    console.log('Found user:', testUser);

    if (!testUser) {
      return res.status(404).json({
        error: 'User not found. Please use registered test account.',
      });
    }

    if (testUser.role !== 'user') {
      return res.status(403).json({
        error: 'Invalid role. Access denied.',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: testUser._id,
        role: testUser.role,
        email: testUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
      user: {
        id: testUser._id,
        email: testUser.email,
        role: testUser.role,
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: error.message });
  }
};
