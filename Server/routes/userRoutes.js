// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Retrieve User Permissions
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found.');
  res.status(200).json({ userId: user.id });
});

module.exports = router;
