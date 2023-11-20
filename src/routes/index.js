const { Router } = require("express")

const usersRouter = require("./users.routes")
const sessionsRouter = require("./sessions.routes")
const favoritesRouter = require("./favorites.routes")
const categoriesRouter = require("./categories.routes")
const productsRouter = require("./products.routes")
const ingredientsRouter = require("./ingredients.routes")

const routes = Router()

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/category", categoriesRouter);
routes.use("/products", productsRouter);
routes.use("/ingredients", ingredientsRouter);

module.exports = routes