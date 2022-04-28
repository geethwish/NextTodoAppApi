// modules
const express = require('express')
const dotenv = require('dotenv').config();
const colors = require('colors');

// config
const ConnectDB = require('./config/db');

// routes
const todoRoutes = require('./routes/todoRoutes');

// middleware
const { errorHandler } = require('./middleware/errorMiddleware');

ConnectDB()
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todo', todoRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server starting on port ${port}`))
