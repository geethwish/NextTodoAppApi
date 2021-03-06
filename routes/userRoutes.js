const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', protect, getUser);

module.exports = router;