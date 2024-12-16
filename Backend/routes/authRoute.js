import express from 'express';
import { login,logout  } from '../controllers/userController.js'; // Import the login controller

const router = express.Router();

// POST route to handle login
router.post('/login', login);
router.post('/logout', logout);

export default router;
