const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const { connectDB } = require('./database/dbConnect');


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // replace with your front-end domain
  methods: ['GET', 'POST' , 'PUT', 'DELETE'], // allowed methods
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const userSignUpRoutes = require('./routes/userSignUpRoutes');
const userLogInRoutes = require('./routes/userLogInRoutes');
const catRoutes = require('./routes/catRoutes');


// Use routes
app.use('/user', userSignUpRoutes); 
app.use('/api/user', userLogInRoutes);
app.use('/cat', catRoutes);  // All routes in catRoutes.js will start with "/cat"


connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
