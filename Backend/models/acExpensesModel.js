import mongoose from 'mongoose';

const ACExpensesSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  department: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ACExpenses = mongoose.model('ACExpenses', ACExpensesSchema);

export default ACExpenses;
