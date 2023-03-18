const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const { authenticateToken } = require('../jwt/jwt-authenticate');
const { checkUser } = require('../utils');

// Middleware functions for both Authn and Authz to be used only for certain routes
const requireAuth = [authenticateToken, checkUser];

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', requireAuth, productController.createProduct);
router.put('/:id', requireAuth, productController.updateProductById);
router.patch('/:id', requireAuth, productController.partialUpdateProductById);
router.delete('/:id', requireAuth, productController.deleteProductById);

module.exports = router;
