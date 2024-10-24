// adminRoutes.js
const express = require('express');
const router = express.Router();

let departments = [];
let preReports = [];

router.post('/login', (req, res) => {
  res.status(200).json({ message: 'Admin logged in successfully' });
});

// Admin creates an account for a department
router.post('/create-department', (req, res) => {
  const newDepartment = { id: departments.length + 1, ...req.body };
  departments.push(newDepartment);
  res.status(201).json(newDepartment);
});

// Admin checks submitted PRE-reports
router.get('/pre-reports', (req, res) => {
  const submittedReports = preReports.filter(
    (report) => report.status === 'Submitted'
  );
  res.status(200).json(submittedReports);
});

// Admin decision for approval of PRE-reports
router.post('/approve-report/:id', (req, res) => {
  const report = preReports.find(
    (report) => report.id === parseInt(req.params.id)
  );
  if (!report) return res.status(404).json({ message: 'Report not found' });

  report.status = 'Approved';
  res.status(200).json({ message: 'Report approved', report });
});

router.get('/budgets', (req, res) => {
  res.status(200).json(budgets);
});

router.get('/budgets/:id', (req, res) => {
  const budget = budgets.find((b) => b.id === parseInt(req.params.id));
  if (!budget) return res.status(404).send('Budget not found.');
  res.status(200).json(budget);
});

module.exports = router;
