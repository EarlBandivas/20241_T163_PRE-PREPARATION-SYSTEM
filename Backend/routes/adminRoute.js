// adminRoutes.js
import express from 'express';
import {
  loginAdmin,
  createDepartment,
  getSubmittedReports,
  approveReport,
  getBudgets,
  getBudgetById,
  getAllAdmins,
  createAdmin,
  logoutAdmin,
} from '../controllers/adminController.js';
import { authenticateToken } from './middleware.js';

const router = express.Router();

// Admin-related routes
router.post('/login', loginAdmin);               // Admin login
router.post('/add', authenticateToken, createAdmin); // Create a new admin
router.post('/logout', logoutAdmin);              // Admin logout

// Department-related route
router.post('/departments', authenticateToken, createDepartment); // Create a new department

// Report-related routes
router.get('/pre-reports', authenticateToken, getSubmittedReports); // Get submitted reports
router.post('/approve-report/:id', authenticateToken, approveReport); // Approve a specific report

// Budget-related routes
router.get('/budgets', authenticateToken, getBudgets);            // Get all budgets
router.get('/budgets/:id', authenticateToken, getBudgetById);      // Get a specific budget by ID

// Admin list route
router.get('/admins', authenticateToken, getAllAdmins);            // Get all admins

export default router;
