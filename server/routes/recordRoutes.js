const express = require('express');
const router = express.Router();
const { getRecords, createRecord, editRecord, deleteRecord } = require('../controllers/recordControllers');

router.get('/', getRecords);            // route to get all the records from the recordControllers.js file

router.post('/', createRecord);                                                       

router.put('/:id', editRecord);                                                      

router.delete('/:id', deleteRecord);

module.exports = router;