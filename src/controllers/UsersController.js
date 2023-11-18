const UserRepository = require("../repositories/UserRepository")
const UserServices = require("../services/UserServices")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const userRepository = new UserRepository();
    const userService = new UserServices(userRepository);

    await userService.execute({ name, email, password })

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const user_id = req.user.id;

    const userRepository = new UserRepository();
    const userService = new UserServices(userRepository);

    await userService.update({ name, email, password, old_password, user_id })

    return res.json()
  }
}

module.exports = UsersController