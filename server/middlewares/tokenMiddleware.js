const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_JWT;  // get the secret jwt from the .env file

// generate a token with the user id and the secret jwt
const generateToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: 300,
    });
};

module.exports = {
    generateToken
};