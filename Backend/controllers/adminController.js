import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Department from '../models/departmentModel.js';




// Create a new admin
export const createAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check for missing fields
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin with the hashed password
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      email,
      role: 'admin'
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

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
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
export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const newDepartment = new Department({ name, description });
    await newDepartment.save();

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


