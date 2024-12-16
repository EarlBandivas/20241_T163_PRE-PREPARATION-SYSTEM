import express from 'express';
import internals from './handler.js';
const router = express.Router();


router.get('/schedule-event', internals.get)
router.put('/schedule-event', internals.put)

export default router;
