const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../middlewares/tokenMiddleware');    // get the generateToken function

// @desc:   This register a new user
// @route:  POST /api/users/
// @access: Public
const registerUser = asyncHandler( async (req, res) => {

    // strcturize the request body
    const { name, email, password } = req.body;

    // check if all the fields are filled
    if(!name || !email || !password) {
        res.status(400).json({
            message: "Touts les champs sont requis !",
        });
    };

    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({
            message: "Cet utilisateur existe déjà !",
        });
    };

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // if the user is created, send the user data and a token
    if(user) {
        res.status(201).json({
            message: "Utilisateur créer !",
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({
            message: "Données invalides !",
        });
    };
});

// @desc:   This logg a user
// @route:  POST /api/users/login
// @access: Public
const loginUser = asyncHandler( async (req, res) => {
    
    const { email, password } = req.body;

    // check if all the fields are filled
    if(!email || !password) {
        res.status(400).json({
            message: "Touts les champs sont requis !",
        });
    };

    //check if user exists
    const userExists = await User.findOne({ email });

    // if the user exists, compare the password with the hashed password
    if (userExists && (await bcrypt.compare(password, userExists.password))) {

        // if the password is correct, send the user data and a token
        res.status(201).json({
            message: "Utilisateur connecté !",
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(userExists._id),
        });
    } else {
        res.status(400).json({
            message: "Données invalides !",
        });
    };

});

// @desc:   This get One user by id
// @route:  GET /api/users/my/data
// @access: Private
const getMyData = asyncHandler( async (req, res) => {

    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id : _id,
        name,
        email
    });
});

// @desc:   This get all the users
// @route:  GET /api/users/
// @access: Private
const getUsers = asyncHandler( async (req, res) => {
    res.json({
        message: "Liste des utilisateurs !"
    });
});

// @desc:   This get One user by id
// @route:  GET /api/users/:id
// @access: Private
const getUserById = asyncHandler( async (req, res) => {
    res.json({
        message: `Voila l'utilisateur ${req.params.id} !`
    });
});

// @desc:   This update a user
// @route:  PUT /api/users/:id
// @access: Private
const updateUser = asyncHandler( async (req, res) => {
    res.json({
        message: `Utilisateur ${req.params.id} modifié !`
    });
});

// @desc:   This delete a user
// @route:  DELETE /api/users/:id
// @access: Private
const deleteUser = asyncHandler( async (req, res) => {
    res.json({
        message: `Utilisateur ${req.params.id} supprimé !`
    });
});

module.exports = {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    getMyData
};

