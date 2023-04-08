const express = require('express');

const userController = require('../controller/users.controller');
const validateDisplayName = require('../middlewares/validateDisplayName');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateDisplayName, validateEmail, validatePassword, userController.addUser);
router.get('/', validateToken, userController.findAllUsers);
router.get('/:id', validateToken, userController.findUserById);
router.delete('/me', validateToken, userController.deleteUser);

module.exports = router;