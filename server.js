// modules
const express = require('express')
const dotenv = require('dotenv').config();
const colors = require('colors');
var cors = require('cors');

// config
const ConnectDB = require('./config/db');

// routes import
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

// middleware
const { errorHandler } = require('./middleware/errorMiddleware');

ConnectDB()
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// routes
app.use('/api/todo', todoRoutes);
app.use('/api/auth', userRoutes);

// error handlers
app.use(errorHandler);

app.listen(port, () => console.log(`Server starting on port ${port}`))
