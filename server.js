// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { id: 1 }; 
  next();
});

// Admin Routes
app.use('/admin', adminRoutes);

// User Routes
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
