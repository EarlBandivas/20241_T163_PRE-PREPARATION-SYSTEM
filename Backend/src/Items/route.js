import express from 'express';
import internals from './handler.js';
const router = express.Router();


router.get('/', internals.get)
router.put('/add', internals.put)
router.delete('/delete-one', internals.delete)




export default router;
