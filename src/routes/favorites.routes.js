const { Router } = require('express');

const FavoriteController = require('../controllers/FavoriteController');
const favoriteController = new FavoriteController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const favoritesRoutes = Router();

favoritesRoutes.get("/", ensureAuthenticated, favoriteController.index);
favoritesRoutes.post("/:id", ensureAuthenticated, favoriteController.create);

module.exports = favoritesRoutes;

