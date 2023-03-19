const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getMyData,
} = require('../controllers/userController');

router.route('/').post(registerUser);
router.route('/:id').put(protect, updateUser).delete(protect, deleteUser);
router.route('/login').post(loginUser);
router.route('/mydata').get(protect, getMyData);

module.exports = router;