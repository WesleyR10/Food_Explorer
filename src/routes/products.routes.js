const { Router } = require('express');

const ProductController = require('../controllers/ProductController');
const productController = new ProductController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const productsRoutes = Router();

productsRoutes.get("/", ensureAuthenticated, productController.index);
productsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization("admin"), productController.create);
productsRoutes.put("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), productController.update);
productsRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), productController.delete);


module.exports = productsRoutes;

