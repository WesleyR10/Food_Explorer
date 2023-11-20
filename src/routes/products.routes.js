const { Router } = require('express');
const multer = require("multer")
const uploadConfig = require("../configs/uploads")

const ProductController = require('../controllers/ProductController');
const productController = new ProductController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const upload = multer(uploadConfig.MULTER)
const productsRoutes = Router();

productsRoutes.get("/", ensureAuthenticated, productController.index);
productsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization("admin"), upload.single("thumbnailUrl"), productController.create);
productsRoutes.put("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), upload.single("thumbnailUrl"), productController.update);
productsRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization("admin"), productController.delete);


module.exports = productsRoutes;

