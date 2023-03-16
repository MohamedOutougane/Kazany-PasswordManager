const Record = require('../models/recordModel');

// @desc:   This get all the records
// @route:  GET /api/records/
// @access: Private
const getRecords = async (req, res) => {

    // find all the records in the database
    const records = await Record.find();    

    // send the records in JSON format, the .status is optional
    res.status(200).json({
        message: "Liste des enregistrements !",
        records
    });                                  
};

// @desc:   This get One record by id
// @route:  GET /api/records/:id
// @access: Private
const getRecordById = async (req, res) => {

    // find the record by its id
    const record = await Record.findById(req.params.id);  

    if(!record) {
        res.status(400).json({
            message: "Enregistrement introuvable !",
        });
    };       

    res.status(200).json({                                  
        message: `Voila l'enregistrement ${req.params.id} !`,
        record
    });
};

// @desc:   This create a new record
// @route:  POST /api/records/
// @access: Private
const createRecord = async (req, res) => {

    // if the body of the request doesn't have a name property, send a 400 status code and a message
    if(!req.body.name) {
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
        // create a new record in the databases
        const record = await Record.create({
            name: req.body.name,
            pseudo: req.body.pseudo,
            email: req.body.email,
            url: req.body.url,
            password: req.body.password,
            salt: req.body.salt,
        });

        res.status(200).json({
            message: "Enregistrement créer !",
            record,
        });
    };
};

// @desc:   This update a record
// @route:  PUT /api/records/:id
// @access: Private
const editRecord = async (req, res) => {

    // find the record by its id
    const record = await Record.findById(req.params.id);  

    if(!record) {
        res.status(400).json({
            message: "Enregistrement introuvable !",
        });
    } else {

        // if the body of the request doesn't have a property, set it to the property of the record
        if(!req.body.name) {
            req.body.name = record.name;
        };
        if(!req.body.pseudo) {
            req.body.pseudo = record.pseudo;
        };
        if(!req.body.email) {
            req.body.email = record.email;
        };
        if(!req.body.url) {
            req.body.url = record.url;
        };
        if(!req.body.password) {
            req.body.password = record.password;
        };
        if(!req.body.salt) {
            req.body.salt = record.salt;
        };

        // update the record with the new data
        const editedRecord = await Record.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );      

        res.status(200).json({
            message: "Enregistrement modifié !",
            editedRecord,
        });
    };
};

// @desc:   This delete a record
// @route:  DELETE /api/records/:id
// @access: Private
const deleteRecord = async (req, res) => {

    // find the record by its id
    const record = await Record.findById(req.params.id);  

    if(!record) {
        res.status(400).json({
            message: "Enregistrement introuvable !",
        });
    };

    // delete the record
    await Record.deleteOne();

    res.status(200).json({                                  
        message: `L'enregistrement ${req.params.id} a été supprimé !`
    });
};

module.exports = {
    getRecords,
    createRecord,
    editRecord,
    deleteRecord,
    getRecordById,
};