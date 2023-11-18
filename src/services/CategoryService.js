const AppError = require("../utils/AppError");

class CategoryService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, position }) {
    const category = await this.userRepository.findByCategory(name)

    if (category) {
      throw new AppError("Produto já cadastrado.", 401);
    }

    const categoryCreated = await this.userRepository.create({ name, position })

    return categoryCreated;
  }
}

module.exports = CategoryService