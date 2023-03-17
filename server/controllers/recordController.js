const Record = require('../models/recordModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { encrypt, decrypt } = require('../middlewares/encryptionMiddleware');

// @desc:   This get all the records
// @route:  GET /api/records/
// @access: Private
const getRecords = asyncHandler(async (req, res) => {

    // find all the records in the database where the user id is the same as the user id in the token
    const records = await Record.find({ user: req.user.id });

    // for each record, decrypt and display the password
    records.forEach(record => {

        const encryption = {
            iv: record.iv,
            password: record.password
        };

        const decryptedPassword = decrypt(encryption);
        record.password = decryptedPassword;
    });

    // send the records in JSON format, the .status is optional
    res.status(200).json({
        message: "Liste des enregistrements !",
        records
    });
});

// @desc:   This get One record by id
// @route:  GET /api/records/:id
// @access: Private
const getRecordById = asyncHandler(async (req, res) => {

    // find the record by its id
    const record = await Record.findById(req.params.id);

    if (!record) {
        res.status(404).json({
            message: "Enregistrement introuvable !",
        });
    } else {

        // decrypt the password
        const encryption = {
            iv: record.iv,
            password: record.password
        };
        const decryptedPassword = decrypt(encryption);
        record.password = decryptedPassword;

        res.status(200).json({
            message: `Voila l'enregistrement ${req.params.id} !`,
            record
        });
    };
});

// @desc:   This create a new record
// @route:  POST /api/records/
// @access: Private
const createRecord = asyncHandler(async (req, res) => {

    // if the body of the request doesn't have a name property, send a 400 status code and a message
    if (!req.body.name) {
        res.status(400).json({
            message: "Le texte est requis !",
        });
    }
    // if the body of the request doesn't have a password property, send a 400 status code and a message 
    else if (!req.body.password) {
        res.status(400).json({
            message: "Le mot de passe est requis !",
        });
    } else {

        // encrypt the password
        const encryptedPassword = encrypt(req.body.password);

        // create a new record in the databases
        const record = await Record.create({
            name: req.body.name,
            connexion: req.body.connexion,
            url: req.body.url,
            password: encryptedPassword.password, // give to the ddb the encrypted password
            iv: encryptedPassword.iv, // give to the ddb the iv buffer
            user: req.user.id // give to the ddb the user id
        });

        res.status(201).json({
            message: "Enregistrement créer !",
            record,
        });
    };
});

// @desc:   This update a record
// @route:  PUT /api/records/:id
// @access: Private
const editRecord = asyncHandler(async (req, res) => {

    // find the record by its id
    const record = await Record.findById(req.params.id);

    if (!record) {
        res.status(404).json({
            message: "Enregistrement introuvable !",
        });
    } else {

        // if the body of the request doesn't have a property, set it to the property of the record
        if (!req.body.name) {
            req.body.name = record.name;
        };
        if (!req.body.connexion) {
            req.body.connexion = record.connexion;
        };
        if (!req.body.url) {
            req.body.url = record.url;
        };
        if (!req.body.password && !req.body.iv) {
            req.body.password = record.password;
            req.body.iv = record.iv;
        } else if (req.body.password) {
            // encrypt the password
            const encryptedPassword = encrypt(req.body.password);
            req.body.password = encryptedPassword.password;
            req.body.iv = encryptedPassword.iv;
        };

        // find the user by its id
        const user = await User.findById(req.user.id);
        // if the user doesn't exist, send a 401 status code and a message
        if (!user) {
            res.status(404).json({
                message: "Utilisateur introuvable !",
            });
            // else if the user id is not the same as the user id in the token, send a 401 status code and a message
        } else if (record.user.toString() !== req.user.id) {
            res.status(401).json({
                message: "Vous n'avez pas le droit de modifier cet enregistrement !",
            });
        } else {
            // update the record with the new data
            const editedRecord = await Record.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );

            res.status(201).json({
                message: "Enregistrement modifié !",
                editedRecord,
            });
        };
    };
});

// @desc:   This delete a record
// @route:  DELETE /api/records/:id
// @access: Private
const deleteRecord = asyncHandler(async (req, res) => {

    // find the record by its id
    const record = await Record.findById(req.params.id);

    if (!record) {
        res.status(404).json({
            message: "Enregistrement introuvable !",
        });
    } else {

        // find the user by its id
        const user = await User.findById(req.user.id);

        // if the user doesn't exist, send a 401 status code and a message
        if (!user) {
            res.status(404).json({
                message: "Utilisateur introuvable !",
            });
        } else {

            // if the user id is not the same as the user id in the token, send a 401 status code and a message
            if (record.user.toString() !== req.user.id) {
                res.status(401).json({
                    message: "Vous n'avez pas le droit de supprimer cet enregistrement !",
                });
            } else {

                // delete the record
                await Record.deleteOne({ _id: req.params.id });

                res.status(200).json({
                    message: `L'enregistrement ${req.params.id} a été supprimé !`
                });
            };
        };
    };
});

module.exports = {
    getRecords,
    createRecord,
    editRecord,
    deleteRecord,
    getRecordById,
};