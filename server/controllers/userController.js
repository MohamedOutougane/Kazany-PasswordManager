const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../middlewares/tokenMiddleware');    // get the generateToken function

// @desc:   This register a new user
// @route:  POST /api/users/
// @access: Public
const registerUser = asyncHandler(async (req, res) => {

    // strcturize the request body
    const { name, email, password } = req.body;

    // regex to check the email
    const regexLength = /^.{5,99}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // check if all the fields are filled
    if (!name || !email || !password) {
        res.status(400).json({
            message: "Touts les champs sont requis !",
        });
    // check if the password is at least 11 characters long, contains at least one uppercase letter,
    // one lowercase letter, one number and one special character
    } else if (!regexLength.test(email) || !regexEmail.test(email)) {
        res.status(400).json({
            message: "L'email ne convient pas !",
        });
    } else if (
        password.length < 11 &&
        password.length > 99 &&
        !password.containsUpperCase && 
        !password.containsLowerCase && 
        !password.containsNumber && 
        !password.containsSpecialCharacter
    ) {
        res.status(400).json({
            message: "Le mot de passe ne convient pas !",
        });
    } else{

        //check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(409).json({
                message: "Cet utilisateur existe déjà !",
            });
        } else {

            // hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // create a new user
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                tokensRevokedAt: null,
            });

            // if the user is not created, send an error message else send the user data and a token
            if (!user) {
                res.status(400).json({
                    message: "Données invalides !",
                });
            } else {
                res.status(201).json({
                    message: "Utilisateur créer !",
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
            };
        };
    };
});

// @desc:   This logg a user
// @route:  POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // check if all the fields are filled
    if (!email || !password) {
        res.status(400).json({
            message: "Touts les champs sont requis !",
        });
    } else {

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
    };
});

// @desc:   This get One user by id
// @route:  GET /api/users/mydata
// @access: Private
const getMyData = asyncHandler(async (req, res) => {

    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    });
});

// @desc:   This update a user
// @route:  PUT /api/users/:id
// @access: Private
const updateUser = asyncHandler(async (req, res) => {

    // find the user by its id
    const user = await User.findById(req.params.id);

    // if the user doesn't exist, send a 400 status code and a message
    if (!user) {
        res.status(404).json({
            message: "Utilisateur introuvable !",
        });
    } else {

        // if the body of the request doesn't have a property, set it to the property of the user
        if (!req.body.name) {
            req.body.name = user.name;
        };
        if (!req.body.email) {
            req.body.email = user.email;
        };
        if (!req.body.tokensRevokedAt) {
            req.body.tokensRevokedAt = user.tokensRevokedAt;
        };
        if (!req.body.password) {
            req.body.password = user.password;
        } else if (req.body.password) {
            // hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;
        }

        // if the user id is not the same as the user id in the token, send a 401 status code and a message
        if (user.id.toString() !== req.user.id) {
            res.status(401).json({
                message: "Vous n'avez pas le droit de modifier cet enregistrement !",
            });
        } else {

            // update the record with the new data
            const editedUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );

            res.status(200).json({
                message: "Profil modifié !",
                editedUser,
            });
        };
    };
});

// @desc:   This delete a user
// @route:  DELETE /api/users/:id
// @access: Private
const deleteUser = asyncHandler(async (req, res) => {

    // find the user by its id
    const user = await User.findById(req.params.id);

    // if the user doesn't exist, send a 400 status code and a message
    if (!user) {
        res.status(404).json({
            message: "Utilisateur introuvable !",
        });
    }
    else if (user.id.toString() !== req.user.id) {

        // if the user id is not the same as the user id in the token, send a 401 status code and a message
        res.status(401).json({
            message: "Vous n'avez pas le droit de supprimer cet utilisateur !",
        });

    } else {

        // delete the user
        await User.deleteOne({ _id: req.params.id });

        res.status(200).json({
            message: `Votre compte ${req.params.id} a été supprimé !`
        });

    };
});

// @desc:   This logout a user
// @route:  POST /api/users/logout/:id
// @access: Private
const logoutUser = asyncHandler(async (req, res) => {

    // find the user by its id
    const user = await User.findById(req.params.id);

    // if the user doesn't exist, send a 400 status code and a message
    if (!user) {
        res.status(404).json({
            message: "Utilisateur introuvable !",
        });
    } else if (user.id.toString() !== req.user.id) {

        // if the user id is not the same as the user id in the token, send a 401 status code and a message
        res.status(401).json({
            message: "Vous n'avez pas le droit de déconnecter cet utilisateur !",
        });

    } else {

        req.body.tokensRevokedAt = new Date();

        // update the record with the date for the revokedToken
        const editedRovekedToken = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );

        console.log(new Date());

        res.status(201).json({
            message: `Votre compte ${req.params.id} a été déconnecté !`,
        });
    };
});

module.exports = {
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getMyData,
    logoutUser,
};

