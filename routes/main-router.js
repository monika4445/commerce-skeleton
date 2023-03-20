//home page
const express = require('express');
const router = express.Router();
const MainController = require('../controllers/main-controller');
const { authenticateToken } = require('../jwt/jwt-authenticate');

router.get('/', authenticateToken, MainController.home)

module.exports = router;
