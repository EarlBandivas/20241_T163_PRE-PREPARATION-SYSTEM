import ACExpenses from '../models/acExpensesModel.js';

export const addExpense = async (req, res) => {
  try {
    const { category, amount, department } = req.body;

    // Validate required fields
    if (!category || !amount || !department) {
      return res.status(400).json({ error: 'Category, amount, and department are required.' });
    }

    // Check if the category already exists for the given department
    const existingExpense = await ACExpenses.findOne({ category, department });
    if (existingExpense) {
      return res.status(400).json({ error: 'This category already exists for the given department.' });
    }

    // Create a new expense document
    const newExpense = new ACExpenses({ category, amount, department });
    await newExpense.save();

    res.status(201).json({ message: 'Expense added successfully.', data: newExpense });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editExpenseAmount = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID of the document to be updated
    const { amount } = req.body;

    // Validate the ID and amount
    if (!id) {
      return res.status(400).json({ error: 'Expense ID is required.' });
    }

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: 'A valid amount is required.' });
    }

    // Find the document by ID
    const expense = await ACExpenses.findById(id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    // Update the amount field
    expense.amount = amount;

    // Save the updated document
    await expense.save();

    res.status(200).json({ message: 'Expense amount updated successfully.', data: expense });
  } catch (error) {
    console.error('Error updating expense amount:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getExpensesByDepartment = async (req, res) => {
  try {
    const { department } = req.params; // Extract department from URL parameters

    // Validate department
    if (!department) {
      return res.status(400).json({ error: 'Department is required.' });
    }

    // Fetch expenses for the specified department
    const expenses = await ACExpenses.find({ department });

    if (expenses.length === 0) {
      return res.status(404).json({ message: `No expenses found for department: ${department}` });
    }

    res.status(200).json({ message: `Expenses for department: ${department}`, data: expenses });
  } catch (error) {
    console.error('Error fetching expenses by department:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the URL parameters

    // Validate the ID
    if (!id) {
      return res.status(400).json({ error: 'Expense ID is required.' });
    }

    // Find and delete the document by ID
    const deletedExpense = await ACExpenses.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    res.status(200).json({ message: 'Expense deleted successfully.', data: deletedExpense });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

