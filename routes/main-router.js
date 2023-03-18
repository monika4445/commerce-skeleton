//home page
const express = require('express');
const router = express.Router();
const MainController = require('../controllers/main-controller');
const { authenticateToken } = require('../jwt/jwt-authenticate');

//Dzer get rout@ petq e stugi middleware-ov token@ reala te che ev user@ verified-a te che
router.get('/', authenticateToken, MainController.home)

module.exports = router;
