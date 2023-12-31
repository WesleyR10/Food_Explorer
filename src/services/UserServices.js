const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError("Este e-mail já esta em uso")
    }
    const hashedPassword = await hash(password, 8)

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })

    return { id: userCreated.id };
  }

  async update({ name, email, password, old_password, user_id }) {

    const user = await this.userRepository.userId(user_id)

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.")
    }
    const updatedUser = {};

    updatedUser.name = name ?? user.name;
    updatedUser.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Gentileza informar a senha antiga para definir a nova senha")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      updatedUser.password = await hash(password, 8)
    }

    const result = await this.userRepository.update(updatedUser, user_id)
    return result
  }

  async userValidation({ user }) {
    const checkUserExists = await this.userRepository.findByUser(user)

    if (checkUserExists.length === 0) {
      throw new AppError("Unauthorized", 401);
    }

    return checkUserExists;
  }
}

module.exports = UserService