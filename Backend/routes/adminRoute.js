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

router.post('/login', loginAdmin);
router.post('/create-department', authenticateToken, createDepartment);
router.get('/pre-reports', authenticateToken, getSubmittedReports);
router.post('/approve-report/:id', authenticateToken, approveReport);
router.get('/budgets', authenticateToken, getBudgets);
router.get('/budgets/:id', authenticateToken, getBudgetById);
router.get('/admins', authenticateToken, getAllAdmins);
router.post('/add', authenticateToken, createAdmin);
router.post('/logout', logoutAdmin);

export default router;
