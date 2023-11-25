const { Router } = require('express');

const FavoriteController = require('../controllers/FavoriteController');
const favoriteController = new FavoriteController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const favoritesRoutes = Router();

favoritesRoutes.get("/", ensureAuthenticated, favoriteController.index);
favoritesRoutes.get("/:id", ensureAuthenticated, favoriteController.index);
favoritesRoutes.post("/:id", ensureAuthenticated, favoriteController.create);
favoritesRoutes.delete("/:id", ensureAuthenticated, favoriteController.delete)

module.exports = favoritesRoutes;

