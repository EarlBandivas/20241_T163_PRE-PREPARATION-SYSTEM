// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const { default: mongoose } = require('mongoose');

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

//DB connection
mongoose
.connect('mongod://127.0.0.1:27017/PRE')
.then(() => {
    console.log('successfuly connected');
   app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
})



 