// controllers/adminController.js
import Admin from '../models/adminModel.js';


let departments = [];
let preReports = [];
let budgets = [];

export const createAdmin = async (req, res) => {
    console.log(req.body); // Log the request body
    try {
      const { username, password, email } = req.body;
  
      const newAdmin = new Admin({ username, password, email });
      await newAdmin.save();
  
      res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
      res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
  };  

  export const getAllAdmins = async (req, res) => {
    try {
      const admins = await Admin.find();  // Fetch all admins from the database
      res.status(200).json(admins);  // Return the list of admins
    } catch (error) {
      res.status(500).json({ message: 'Error fetching admins', error: error.message });
    }
  };
  
  export const loginAdmin = async (req, res) => {
    try {
      const { username, password } = req.body;
      // Authentication logic here
      res.status(200).json({ message: 'Admin logged in successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error during login' });
    }
  };
export const createDepartment = (req, res) => {
  const newDepartment = { id: departments.length + 1, ...req.body };
  departments.push(newDepartment);
  res.status(201).json(newDepartment);
};

export const getSubmittedReports = (req, res) => {
  const submittedReports = preReports.filter((report) => report.status === 'Submitted');
  res.status(200).json(submittedReports);
};

export const approveReport = (req, res) => {
  const report = preReports.find((report) => report.id === parseInt(req.params.id));
  if (!report) return res.status(404).json({ message: 'Report not found' });

  report.status = 'Approved';
  res.status(200).json({ message: 'Report approved', report });
};

export const getBudgets = (req, res) => {
  res.status(200).json(budgets);
};

export const getBudgetById = (req, res) => {
  const budget = budgets.find((b) => b.id === parseInt(req.params.id));
  if (!budget) return res.status(404).send('Budget not found.');
  res.status(200).json(budget);
};


