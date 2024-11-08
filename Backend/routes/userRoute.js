// routes/userRoutes.js
import express from 'express';
import { loginUser, getUserById, createPreReport, submitPreReport, getPendingReports } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/:id', getUserById);
router.post('/input-pre-report', createPreReport);
router.post('/submit-pre-report/:id', submitPreReport);
router.get('/pending-reports', getPendingReports);

export default router;
