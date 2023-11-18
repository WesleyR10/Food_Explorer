const ProductRepository = require("../repositories/ProductRepository")
const ProductService = require("../services/ProductService")

class ProductController {
  async create(req, res) {
    const { title, thumbnailUrl, description, value, category, ingredients } = req.body

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    await productService.execute({ title, thumbnailUrl, description, value, category, ingredients })

    return res.status(201).json()
  }
}

module.exports = ProductController