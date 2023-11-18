const { Router } = require("express")

const usersRouter = require("./users.routes")
const sessionsRouter = require("./sessions.routes")
const categoriesRouter = require("./categories.routes")
const productsRouter = require("./products.routes")

const routes = Router()

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/category", categoriesRouter);
routes.use("/products", productsRouter);

module.exports = routes