const { Router } = require('express');

const CategoryController = require('../controllers/CategoryController');
const categoryController = new CategoryController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const categoriesRoutes = Router();

categoriesRoutes.post("/", ensureAuthenticated, verifyUserAuthorization("admin"), categoryController.create);
categoriesRoutes.get("/", ensureAuthenticated, categoryController.index);

module.exports = categoriesRoutes;

