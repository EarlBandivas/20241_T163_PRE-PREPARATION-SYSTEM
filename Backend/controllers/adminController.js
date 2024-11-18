import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Create a new user
// export const createUser = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     // Check for missing fields
//     if (!email || !password || !role) {
//       return res
//         .status(400)
//         .json({ message: 'Email, password, and role are required' });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: 'User with this email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user with the hashed password
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     res
//       .status(201)
//       .json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: 'Error creating user', error: error.message });
//   }
// };

// Get all admins

export const createUserByAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Unable to create user' });
    }

    // Generate and hash verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    // Create user
    const newUser = new User({
      email,
      role: 'user',
      verificationToken: hashedToken,
    });

    await newUser.save();

    // Send verification email
    const verificationLink = `http://localhost:5173/?token=${verificationToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Verification and Password Setup',
      html: `<p>You have been registered by the administrator. Click the link below to verify your email and set your password:</p>
             <a href="${verificationLink}">Verify Email & Set Password</a>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res
        .status(500)
        .json({ message: 'User created, but email failed to send' });
    }

    res
      .status(201)
      .json({ message: 'User created and verification email sent' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

export const setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({ verificationToken: hashedToken });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash and save the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verificationToken = null;
    user.isVerified = true;
    user.hasSetPassword = true;

    await user.save();

    res.status(200).json({ message: 'Password successfully set' });
  } catch (error) {
    console.error('Error setting password:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error fetching admins', error: error.message });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
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
    res.status(201).json({
      message: 'Department created successfully',
      department: newDepartment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error creating department', error: error.message });
  }
};

// Get submitted reports
export const getSubmittedReports = (req, res) => {
  try {
    const submittedReports = preReports.filter(
      (report) => report.status === 'Submitted'
    );
    res.status(200).json(submittedReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching submitted reports',
      error: error.message,
    });
  }
};

// Approve a report
export const approveReport = (req, res) => {
  try {
    const report = preReports.find(
      (report) => report.id === parseInt(req.params.id)
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.status = 'Approved';
    res.status(200).json({ message: 'Report approved', report });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error approving report', error: error.message });
  }
};

// Get all budgets
export const getBudgets = (req, res) => {
  try {
    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error fetching budgets', error: error.message });
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
    res
      .status(500)
      .json({ message: 'Error fetching budget', error: error.message });
  }
};

// Admin logout
export const logoutAdmin = (req, res) => {
  try {
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error during logout', error: error.message });
  }
};
