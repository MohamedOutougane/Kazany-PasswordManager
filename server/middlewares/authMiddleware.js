const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const secret = process.env.SECRET_JWT;  // get the secret jwt from the .env file

// generate a token with the user id and the secret jwt
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // check if the request has a token and if it starts with 'Bearer' in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get the token from the headers
            token = req.headers.authorization.split(' ')[1];

            // verify the token by decoding it
            const decoded = jwt.verify(token, secret);

            // get the user by the id in the token and remove the password from the user
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({
                message: 'Not authorized, token failed'
            });
        };
    };

    if (!token) {
        res.status(401).json({
            message: 'Not authorized, no token'
        });
    };
});

module.exports = {
    protect
};