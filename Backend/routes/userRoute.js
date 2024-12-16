// routes/userRoutes.js
import express from 'express';
import { login, authenticateGoogleUser,logout } from '../controllers/userController.js';

const router = express.Router();

// Login route for email/password login
router.post('/login', login);

// Google OAuth login route
router.post('/auth/google', authenticateGoogleUser); 
router.post('/logout', logout);

export default router;
