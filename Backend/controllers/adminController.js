import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




// Create a new user
export const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check for missing fields
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // // Hash the password before saving
     const hashedPassword = await bcrypt.hash(password, 10);

   // Create a new user with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        role: 'admin',
      },
      process.env.JWT_SECRET, // Ensure you have this environment variable configured
      {
        expiresIn: '1h', // Token expiration time
      }
    );

    // Respond with the token and admin details
    res.status(200).json({
      message: 'Login successful',
      token,
      role: 'admin',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Create a new department
export const createDepartment = (req, res) => {
  try {
    const newDepartment = { id: departments.length + 1, ...req.body };
    departments.push(newDepartment);
    res.status(201).json({ message: 'Department created successfully', department: newDepartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
};

// Get submitted reports
export const getSubmittedReports = (req, res) => {
  try {
    const submittedReports = preReports.filter((report) => report.status === 'Submitted');
    res.status(200).json(submittedReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching submitted reports', error: error.message });
  }
};

// Approve a report
export const approveReport = (req, res) => {
  try {
    const report = preReports.find((report) => report.id === parseInt(req.params.id));
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.status = 'Approved';
    res.status(200).json({ message: 'Report approved', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error approving report', error: error.message });
  }
};

// Get all budgets
export const getBudgets = (req, res) => {
  try {
    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching budgets', error: error.message });
  }
};

// Get a specific budget by ID
export const getBudgetById = (req, res) => {
  try {
    const budget = budgets.find((b) => b.id === parseInt(req.params.id));
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching budget', error: error.message });
  }
};

// Admin logout
export const logoutAdmin = (req, res) => {
  try {
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during logout', error: error.message });
  }
};

