const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    getMyData,
} = require('../controllers/userController');

router.post('/', registerUser);

router.route('/').get(getUsers).post(registerUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/login').post(loginUser);
router.route('/my/data').get(protect, getMyData);

module.exports = router;