const { Router } = require('express');

const CategoryController = require('../controllers/CategoryController');
const categoryController = new CategoryController();

const categoriesRoutes = Router();
categoriesRoutes.post("/", categoryController.create);

module.exports = categoriesRoutes;

