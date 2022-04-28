const express = require('express');
const { getTodos, saveTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/all', protect, getTodos);

router.post('/', protect, saveTodo);

router.put('/:id', protect, updateTodo);

router.delete('/:id', protect, deleteTodo);

module.exports = router;