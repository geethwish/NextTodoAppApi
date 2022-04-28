const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {

            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get User from token
            req.user = await User.findById(decoded.id).select('-password');

            next()

        } catch (error) {

            console.log(error);

            res.status(401);

            throw new Error('Not Authorized')

        }
    }

    // empty token
    if (!token) {

        res.status(401);

        throw new Error('Not Authorized, no token')
    }
});

module.exports = protect