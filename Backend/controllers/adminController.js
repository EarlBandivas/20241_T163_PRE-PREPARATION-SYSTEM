import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let departments = [];
let preReports = [];
let budgets = [];

// Create a new admin
export const createAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin with the hashed password
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      email,
      role: 'admin' // Ensure 'role' is set if needed
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
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

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect or wrong password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Admin logged in successfully',
      token,
      admin: { id: admin._id, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Create a new department
export const createDepartment = (req, res) => {
  const newDepartment = { id: departments.length + 1, ...req.body };
  departments.push(newDepartment);
  res.status(201).json(newDepartment);
};

// Get submitted reports
export const getSubmittedReports = (req, res) => {
  const submittedReports = preReports.filter((report) => report.status === 'Submitted');
  res.status(200).json(submittedReports);
};

// Approve a report
export const approveReport = (req, res) => {
  const report = preReports.find((report) => report.id === parseInt(req.params.id));
  if (!report) return res.status(404).json({ message: 'Report not found' });

  report.status = 'Approved';
  res.status(200).json({ message: 'Report approved', report });
};

// Get all budgets
export const getBudgets = (req, res) => {
  res.status(200).json(budgets);
};

// Get a specific budget by ID
export const getBudgetById = (req, res) => {
  const budget = budgets.find((b) => b.id === parseInt(req.params.id));
  if (!budget) return res.status(404).json({ message: 'Budget not found' });
  res.status(200).json(budget);
};
