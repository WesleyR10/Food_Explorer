const { Router } = require('express');

const ProductController = require('../controllers/ProductController');
const productController = new ProductController();

const productsRoutes = Router();
productsRoutes.post("/", productController.create);

module.exports = productsRoutes;

