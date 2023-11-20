const AppError = require("../utils/AppError");
const ProductRepository = require("../repositories/ProductRepository");

class IngredientService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.productRepository = new ProductRepository(); // Instanciando o ProductRepository
  }

  async findIngredients() {
    const ingredient = await this.userRepository.findByAllIngredients()

    if (ingredient.length === 0) {
      throw new AppError("Ainda não foi criado nenhum prato.", 401);
    }

    return ingredient;
  }

  async findDishByIngredient(product_id) {
    const ingredient = await this.userRepository.findDishIngredient(product_id)

    if (ingredient.length === 0) {
      throw new AppError("Prato não foi encontrado.", 401);
    }

    return ingredient;
  }
}

module.exports = IngredientService