const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const { connectDB } = require('./database/dbConnect');


// Import routes
const userSignUpRoutes = require('./routes/userSignUpRoutes');
const userLogInRoutes = require('./routes/userLogInRoutes');
const catRoutes = require('./routes/catRoutes');
const dailyLogsRoutes = require('./routes/dailyLogsRoutes');
const foodProductsRoutes = require('./routes/foodProductsRoutes');



// Middleware to accept JSON and URL encoded data in the body of a request

app.use(cors({
  origin: 'http://localhost:5173', // replace with your front-end domain
  methods: ['GET', 'POST' , 'PUT', 'DELETE'], // allowed methods
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use routes
app.use('/user', userSignUpRoutes);       // All routes in userSignUpRoutes.js will start with "/user"
app.use('/api/user', userLogInRoutes);      // All routes in userLogInRoutes.js will start with "/api/user"
app.use('/cat', catRoutes);       // All routes in catRoutes.js will start with "/cat"
app.use('/api/dailyLogs', dailyLogsRoutes);  // All routes in dailyLogsRoutes.js will start with "/dailyLogs"
app.use('/api', foodProductsRoutes);           // All routes in foodProductRoutes.js will start with "/api"
  


connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
