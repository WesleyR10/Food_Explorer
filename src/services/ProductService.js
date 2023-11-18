const AppError = require("../utils/AppError");

class ProductService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ title, thumbnailUrl, description, value, category, ingredients }) {
    const product = await this.userRepository.findByNameProduct(title)

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

  async deleteProduct(id) {
    const product = await this.userRepository.delete(id)

    return product;
  }

  async update({ product_id, title, thumbnailUrl, description, value, ingredients }) {
    const product = await this.userRepository.findByIdProduct(product_id)

    if (!product) {
      throw new AppError("Produto não encontrado.", 401);
    }

    const updatedProduct = {};

    updatedProduct.title = title ?? product.title;
    updatedProduct.thumbnailUrl = thumbnailUrl ?? product.thumbnailUrl;
    updatedProduct.description = description ?? product.description;
    updatedProduct.value = value ?? product.value;
    updatedProduct.category = product.category;
    updatedProduct.ingredients = ingredients ?? product.ingredients;

    const result = await this.userRepository.update(updatedProduct, product_id)

    return result
  }
}

module.exports = ProductService