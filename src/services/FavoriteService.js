const AppError = require("../utils/AppError");
const ProductRepository = require("../repositories/ProductRepository");

class FavoriteService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.productRepository = new ProductRepository(); // Instanciando o ProductRepository
  }

  async execute({ user_id, product_id }) {
    const existingFavorite = await this.userRepository.findByAlreadyFavoriteProduct(user_id, product_id);
    if (existingFavorite.length > 0) {
      throw new AppError("Você já favoritou este produto.", 401);
    }

    const product = await this.productRepository.findByIdProduct(product_id);
    if (!product) {
      throw new AppError("Produto não foi encontrado.", 401);
    }

    const favoriteCreated = await this.userRepository.create({ user_id, product_id })

    return favoriteCreated;
  }

  async findFavorite(user_id) {
    try {
      const favorite = await this.userRepository.findByFavorite(user_id);

      if (favorite.length > 0) {
        return favorite;
      } else {
        return favorite;
      }
    } catch (error) {
      return { message: "Erro ao buscar os favoritos", status: 500 };
    }
  }

  async deleteFavorite({ user_id, product_id }) {
    const favorite = await this.userRepository.delete({ user_id, product_id })

    if (!favorite) {
      throw new AppError("Item não foi favoritado", 401);
    }

    return favorite;
  }

  async findFavoriteById(favoriteId) {
    const favorite = await this.userRepository.findById(favoriteId);
    if (!favorite) {
      throw new AppError("Favorito não encontrado", 404);
    }
    return favorite;
  }
}

module.exports = FavoriteService