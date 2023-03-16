const express = require('express');
const router = express.Router();
const { 
    getRecords, 
    createRecord, 
    editRecord, 
    deleteRecord,
    getRecordById,
} = require('../controllers/recordController');


// router.get('/', getRecords);            // route to get all the records from the recordController.js file
// router.post('/', createRecord);
router.route('/').get(getRecords).post(createRecord);  // same as above but with the route method

// router.put('/:id', editRecord);
// router.delete('/:id', deleteRecord);
router.route('/:id').put(editRecord).delete(deleteRecord).get(getRecordById);


module.exports = router;