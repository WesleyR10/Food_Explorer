const AppError = require("../utils/AppError");

class CategoryService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, position }) {
    const category = await this.userRepository.findByNameCategory(name)

    if (category) {
      throw new AppError("Produto já cadastrado.", 401);
    }

    const categoryCreated = await this.userRepository.create({ name, position })

    return categoryCreated;
  }

  async findCategory() {
    const category = await this.userRepository.findByAllCategory()

    if (category.length === 0) {
      throw new AppError("Nenhuma categoria foi criada.", 401);
    }

    return category;
  }
}

module.exports = CategoryService