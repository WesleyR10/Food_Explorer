const AppError = require("../utils/AppError");

class ProductService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ title, thumbnailUrl, description, value, category, ingredients }) {
    const product = await this.userRepository.findByProduct(title)

    if (product) {
      throw new AppError("Produto já cadastrado.", 401);
    }

    const productCreated = await this.userRepository.create({ title, thumbnailUrl, description, value, category, ingredients })

    return productCreated;
  }

  async findProducts() {
    const products = await this.userRepository.findByAllProducts()

    if (products.length === 0) {
      throw new AppError("Nenhum produto foi criado.", 401);
    }

    return products;
  }
}

module.exports = ProductService