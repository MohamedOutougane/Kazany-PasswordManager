// @desc:   This get all the records
// @route:  GET /api/records/
// @access: Public
const getRecords = async (req, res) => {
    res.status(200).json({                      // the .status is optional, it is a good practice to send it
        message: "Page des enregistrements !"
    });
};

// @desc:   This create a new record
// @route:  POST /api/records/
// @access: Private
const createRecord = async (req, res) => {
    res.status(200).json({                                  
        message: "Creer un enregistrement !"
    });
};

// @desc:   This update a record
// @route:  PUT /api/records/:id
// @access: Private
const editRecord = async (req, res) => {
    res.status(200).json({                                  
        message: `Modifier l'enregistrement ${req.params.id} !`
    });
};

// @desc:   This delete a record
// @route:  DELETE /api/records/:id
// @access: Private
const deleteRecord = async (req, res) => {
    res.status(200).json({                                  
        message: `Supprimer l'enregistrement ${req.params.id} !`
    });
};

module.exports = {
    getRecords,
    createRecord,
    editRecord,
    deleteRecord
};