const UserRepository = require("../repositories/UserRepository")
const UserServices = require("../services/UserServices")

class UsersValidatedController {
  async index(request, response) {
    const { user } = request

    const userRepository = new UserRepository();
    const userService = new UserServices(userRepository);

    await userService.userValidation({ user })

    return response.status(200).json();
  }
}

module.exports = UsersValidatedController;
