// routes/adminRoutes.js
import express from 'express';
import {
  loginAdmin,
  //createDepartment,
  getSubmittedReports,
  approveReport,
  getBudgets,
  getBudgetById,
  getAllAdmins,
  createUserByAdmin,
  setPassword,
  logoutAdmin,
} from '../controllers/adminController.js';

import Admin from '../models/adminModel.js';

const router = express.Router();

router.post('/login', loginAdmin);
// router.post('/create-department', createDepartment);
router.get('/pre-reports', getSubmittedReports);
router.post('/approve-report/:id', approveReport);
router.get('/budgets', getBudgets);
router.get('/budgets/:id', getBudgetById);
router.get('/admins', getAllAdmins);
router.post('/add', createUserByAdmin);
router.post('/set-password', setPassword);
router.post('/logout');

export default router;
