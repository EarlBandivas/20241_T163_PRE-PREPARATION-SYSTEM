// userRoutes.js
const express = require('express');
const router = express.Router();

let preReports = []; 


router.post('/login', (req, res) => {
  // Implement your login logic (authentication) here
  res.status(200).json({ message: 'User logged in successfully' });
});

// User inputs data for PRE-Reports
router.post('/input-pre-report', (req, res) => {
  const newReport = { id: preReports.length + 1, userId: req.user.id, ...req.body, status: 'Draft' };
  preReports.push(newReport);
  res.status(201).json(newReport);
});

// User submits PRE-Reports
router.post('/submit-pre-report/:id', (req, res) => {
  const report = preReports.find(report => report.id === parseInt(req.params.id) && report.userId === req.user.id);
  if (!report) return res.status(404).json({ message: 'Report not found or not owned by the user' });

  report.status = 'Submitted';
  res.status(200).json({ message: 'Report submitted for approval', report });
});

// User views pending approval reports
router.get('/pending-reports', (req, res) => {
  const pendingReports = preReports.filter(report => report.userId === req.user.id && report.status === 'Submitted');
  res.status(200).json(pendingReports);
});

module.exports = router;
