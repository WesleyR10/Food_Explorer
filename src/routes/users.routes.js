const { Router } = require("express")
const usersRoutes = Router()

const UsersValidatedController = require("../controllers/UsersValidatedController");
const UsersController = require("../controllers/UsersController")

const usersController = new UsersController()
const usersValidatedController = new UsersValidatedController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

usersRoutes.post("/", usersController.create)
usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index);
usersRoutes.put("/", ensureAuthenticated, usersController.update)

module.exports = usersRoutes