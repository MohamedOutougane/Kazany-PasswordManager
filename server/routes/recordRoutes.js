const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
    getRecords, 
    createRecord, 
    editRecord, 
    deleteRecord,
    getRecordById,
} = require('../controllers/recordController');


// router.get('/', getRecords);            // route to get all the records from the recordController.js file
// router.post('/', createRecord);
router.route('/').get(protect, getRecords).post(protect, createRecord);  // same as above but with the route method

// router.put('/:id', editRecord);
// router.delete('/:id', deleteRecord);
router.route('/:id').put(protect, editRecord).delete(protect, deleteRecord).get(protect, getRecordById);


module.exports = router;