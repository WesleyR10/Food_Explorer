const { Router } = require('express');

const IngredientController = require('../controllers/IngredientController');
const ingredientController = new IngredientController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ingredientsRoutes = Router();

ingredientsRoutes.get("/", ensureAuthenticated, ingredientController.index);
ingredientsRoutes.get("/:id", ensureAuthenticated, ingredientController.show);


module.exports = ingredientsRoutes;

