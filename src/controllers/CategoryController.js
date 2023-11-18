const CategoryRepository = require("../repositories/CategoryRepository")
const CategoryService = require("../services/CategoryService")

class ProductController {
  async create(req, res) {
    const { name, position } = req.body

    const categoryRepository = new CategoryRepository();
    const categoryService = new CategoryService(categoryRepository);

    await categoryService.execute({ name, position })

    return res.status(201).json()
  }

  async index(req, res) {
    const categoryRepository = new CategoryRepository();
    const categoryService = new CategoryService(categoryRepository);

    const category = await categoryService.findCategory()

    return res.status(201).json(category)
  }
}

module.exports = ProductController