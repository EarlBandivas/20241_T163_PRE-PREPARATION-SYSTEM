import express from 'express';
import { addExpense, editExpenseAmount,getExpensesByDepartment, deleteExpense    } from '../controllers/acExpensesController.js';

const router = express.Router();

router.post('/add-expense', addExpense);
router.put('/edit-amount/:id', editExpenseAmount );
router.get('/by-department/:department', getExpensesByDepartment);
router.delete('/delete-expense/:id', deleteExpense);

export default router;
