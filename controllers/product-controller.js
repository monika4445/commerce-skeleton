const ProductService = require('../services/product-service');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({
        status: 'success',
        data: {
          products
        },
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error geting all product" });    }
  },

  getProductById: async (req, res) => {
    const id = req.params.id;
    try {
      const product = await ProductService.getProductById(id);
      if (!product) {
        res.status(404).json({
            status: 'error',
            message: `Product with ID ${id} not found`,
          });
      } else {
        res.status(200).json({
            status: 'success',
            data: {
              product
            },
          });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error geting product" });    }
  },

  createProduct: async (req, res) => {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image ) {
        res.status(400).send('Please provide all required fields.');
        return;
      }

    try {
      const product = await ProductService.createProduct(name, description, price, image);
      res.status(201).json({
        status: 'success',
        data: {
          product
        },
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error creating product" });    }
  },

  updateProductById: async (req, res) => {
    const id = req.params.id;
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image ) {
        res.status(400).send('Please provide all required fields.');
        return;
      }
      
    try {
      const product = await ProductService.updateProductById(id, name, description, price, image);
      if (!product) {
        res.status(404).json({
            status: 'error',
            message: `Product with ID ${id} not found`,
          });
      } else {
        res.status(200).json({
            status: 'success',
            data: {
              product
            },
          });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error updating product" });    }
  },

  partialUpdateProductById: async (req, res) => {
    const id = req.params.id;

    if (!req.body ) {
        res.status(400).send('Please provide any fields.');
        return;
      }
      
    try {
      const product = await ProductService.partialUpdateProductById(id, req.body);
      if (!product) {
        res.status(404).json({
            status: 'error',
            message: `Product with ID ${id} not found`,
          });
      } else {
        res.status(200).json({
            status: 'success',
            data: {
              product
            },
          });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error updating product" });
    }
  },

  deleteProductById: async (req, res) => {
    const id = req.params.id;
    try {
      const product = await ProductService.deleteProductById(id);
      if (!product) {
        res.status(404).json({
            status: 'error',
            message: `Product with ID ${id} not found`,
          });
      } else {
        res.status(200).send({
          message: `Product with ID ${id} deleted successfully`,
          product
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error deleting product" });
    }
  },
};

module.exports = productController;
