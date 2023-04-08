const express = require('express');

const router = express.Router();

const LoginController = require('../controller/login.controller');
const validateLogin = require('../middlewares/validateLogin');

router.post('/', validateLogin, LoginController.login);

module.exports = router;