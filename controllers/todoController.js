const asyncHandler = require('express-async-handler');

const Todo = require('../model/todoModel')
const User = require('../model/userModel')

// Get Todos - GET/api/todo - Private
const getTodos = asyncHandler(async (req, res) => {

    let todos;
    if (req.query.status) {

        todos = await Todo.find({ user: req.user.id, status: req.query.status });

    } else {

        todos = await Todo.find({ user: req.user.id });

    }

    res.status(200).json(todos)

});

// Add New Todo - POST/api/todo - Private
const saveTodo = asyncHandler(async (req, res) => {

    const { title, status } = req.body

    console.log(req.body);

    if (!title) {

        res.status(400)
        throw new Error('Please Enter Valid Details')
    }

    const todo = await Todo.create({
        title,
        status,
        user: req.user.id
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

    const user = await User.findById(req.user.id);

    // check for user
    if (!user) {

        res.status(404)

        throw new Error("User not found")
    }

    // user match with logged user
    if (todo.user.toString() !== user.id) {

        res.status(401)

        throw new Error("User not Authorized")

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

    const user = await User.findById(req.user.id);

    // check for user
    if (!user) {

        res.status(404)

        throw new Error("User not found")
    }

    // user match with logged user
    if (todo.user.toString() !== user.id) {

        res.status(401)

        throw new Error("User not Authorized")

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