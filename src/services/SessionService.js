const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class SessionService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    delete user.password

    return user
  }
}

module.exports = SessionService