const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//models
const User = require('../model/userModel')

// Register User - POST/api/auth/register - Public
const registerUser = asyncHandler(async (req, res) => {

    console.log(req.body);

    const { name, email, password } = req.body

    if (!name || !email || !password) {

        res.status(400);

        throw new Error('Please Complete all the fields');
    }

    // Check if user Exists
    const registeredUser = await User.findOne({ email });

    if (registeredUser) {

        res.status(400);

        throw new Error('User Already exist');

    }

    // password hashing
    const salt = await bcrypt.genSalt(15);

    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    });

    if (user) {

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToke(user.id)
        });

    } else {

        res.status(400);

        throw new Error('Invalid User Data');

    }

});

// Login User - POST/api/auth/login - Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (user && checkPassword) {

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToke(user.id)
        });

    } else {

        res.status(400);

        throw new Error('Invalid User Credentials');

    }

});

// Get User Details - GET/api/auth/user - Public
const getUser = asyncHandler(async (req, res) => {

    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    });

});

const generateToke = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

}

module.exports = {
    registerUser,
    loginUser,
    getUser
}