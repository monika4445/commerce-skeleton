const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/verify/:token', AuthController.verify)

module.exports = router;
