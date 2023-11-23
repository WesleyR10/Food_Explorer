const ProductRepository = require("../repositories/ProductRepository")
const ProductService = require("../services/ProductService")

class ProductController {
  async create(req, res) {
    const { title, description, value, category, ingredients } = req.body
    const thumbnailUrl = req.file.filename;

    const parsedIngredients = JSON.parse(ingredients);

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    await productService.execute({ title, thumbnailUrl, description, value, category, ingredients: parsedIngredients })

    return res.status(201).json()
  }

  async index(req, res) {
    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    const products = await productService.findProducts()

    return res.status(201).json(products)
  }

  async delete(req, res) {
    const { id } = req.params

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    await productService.deleteProduct(id)

    return res.status(201).json()
  }

  async update(req, res) {
    const { title, description, value, ingredients } = req.body
    const { id: product_id } = req.params;
    const thumbnailUrl = req.file.filename;

    const parsedIngredients = JSON.parse(ingredients);

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    await productService.update({ title, thumbnailUrl, description, value, ingredients: parsedIngredients, product_id })

    return res.json()
  }

  async ProductTitle(req, res) {
    const { searchTerm } = req.query

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    const products = await productService.show(searchTerm)
    console.log(products)

    return res.status(201).json(products)
  }
}

module.exports = ProductController