// routes/adminRoutes.js
import express from 'express';
import {
  loginAdmin,
  createDepartment,
  getSubmittedReports,
  approveReport,
  getBudgets,
  getBudgetById,
  getAllAdmins,
  createUser,
  logoutAdmin,
} from '../controllers/adminController.js';

import Admin from '../models/adminModel.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/create-department', authenticateToken, createDepartment);
router.get('/pre-reports', authenticateToken, getSubmittedReports);
router.post('/approve-report/:id', authenticateToken, approveReport);
router.get('/budgets', authenticateToken, getBudgets);
router.get('/budgets/:id', authenticateToken, getBudgetById);
router.get('/admins',getAllAdmins);
router.post('/add',  createUser);
router.post('/logout')

export default router;
