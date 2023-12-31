const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")
class ProductService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ title, thumbnailUrl, description, value, category, ingredients }) {
    const product = await this.userRepository.findByNameProduct(title)
    const diskStorage = new DiskStorage();

    if (product) {
      await diskStorage.deleteFileTMP(thumbnailUrl);
      throw new AppError("Produto já cadastrado.", 401);
    }

    console.log(product)
    const filename = await diskStorage.saveFile(thumbnailUrl);

    const productCreated = await this.userRepository.create({ title, thumbnailUrl: filename, description, value, category, ingredients })

    return productCreated;
  }

  async findProducts() {
    const products = await this.userRepository.findByAllProducts()

    if (products.length === 0) {
      throw new AppError("Nenhum produto foi criado.", 401);
    }

    return products;
  }

  async findByIdProducts(id) {
    try {
      const products = await this.userRepository.findByIdProduct(id)
      if (products) {
        return products;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    const product = await this.userRepository.delete(id)

    return product;
  }

  async update({ product_id, title, thumbnailUrl, description, value, ingredients }) {
    const product = await this.userRepository.findByIdProduct(product_id)
    const diskStorage = new DiskStorage();

    if (!product) {
      throw new AppError("Produto não encontrado.", 401);
    }

    if (thumbnailUrl) {
      await diskStorage.deleteFile(product.thumbnailUrl);
      const filename = await diskStorage.saveFile(thumbnailUrl);

      const updatedProduct = {};

      updatedProduct.title = title ?? product.title;
      updatedProduct.thumbnailUrl = filename
      updatedProduct.description = description ?? product.description;
      updatedProduct.value = value ?? product.value;
      updatedProduct.category = product.category;
      updatedProduct.ingredients = ingredients ?? product.ingredients;

      const result = await this.userRepository.update(updatedProduct, product_id)
      return result
    } else {
      const updatedProduct = {};

      updatedProduct.title = title ?? product.title;
      updatedProduct.thumbnailUrl = product.thumbnailUrl;
      updatedProduct.description = description ?? product.description;
      updatedProduct.value = value ?? product.value;
      updatedProduct.category = product.category;
      updatedProduct.ingredients = ingredients ?? product.ingredients;

      const result = await this.userRepository.update(updatedProduct, product_id)
      return result
    }
  }

  async show(searchTerm) {
    const products = await this.userRepository.findByTitleOrIngredientName(searchTerm)

    if (products.length === 0) {
      throw new AppError("Nenhum produto foi encontrado.", 401);
    }

    return products;
  }
}

module.exports = ProductService