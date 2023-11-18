const { Router } = require('express');

const ProductController = require('../controllers/ProductController');
const productController = new ProductController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const productsRoutes = Router();

productsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization("admin"), productController.create);
productsRoutes.get("/", ensureAuthenticated, productController.index);

module.exports = productsRoutes;

