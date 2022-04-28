const asyncHandler = require('express-async-handler');

const Todo = require('../model/todoModel')

// Get Todos - GET/api/todo - Private
const getTodos = asyncHandler(async (req, res) => {

    const todos = await Todo.find();

    res.status(200).json(todos)

});

// Add New Todo - POST/api/todo - Private
const saveTodo = asyncHandler(async (req, res) => {

    const { title, status } = req.body

    if (!title) {

        res.status(400)
        throw new Error('Please Submit todo Correctly')
    }

    const todo = await Todo.create({
        title,
        status
    });

    res.status(201).json(todo);

});

// Update todo - PUT/api/todo/id - Private
const updateTodo = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id).exec();

    if (!todo) {

        res.status(404)

        throw new Error("Todo not found")
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(200).json(updatedTodo)

});

// Delete Todo - DELETE/api/todo/id - Private
const deleteTodo = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id).exec();

    if (!todo) {

        res.status(404)

        throw new Error("Todo not found")
    }

    await todo.remove();

    res.status(200).json({ id: req.params.id })

});

module.exports = {
    getTodos,
    saveTodo,
    updateTodo,
    deleteTodo
}