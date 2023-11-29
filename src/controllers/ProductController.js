const ProductRepository = require("../repositories/ProductRepository")
const ProductService = require("../services/ProductService")

class ProductController {
  async create(req, res) {
    console.log("Requisição recebida no backend:", req.body); // Log dos dados recebidos no corpo da requisição
    console.log("Arquivo recebido no backend:", req.file); // Log do arquivo recebido, se estiver presente
    const { title, description, value, category, ingredients } = req.body
    const thumbnailUrl = req.file.filename;
    console.log(thumbnailUrl)

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

  async show(req, res) {
    const { id } = req.params;

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    try {
      const products = await productService.findByIdProducts(id)
      return res.status(200).json(products);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
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

    if (req.file && req.file.filename) {
      const thumbnailUrl = req.file.filename;
      const parsedIngredients = JSON.parse(ingredients);

      const productRepository = new ProductRepository();
      const productService = new ProductService(productRepository);

      await productService.update({ title, thumbnailUrl, description, value, ingredients: parsedIngredients, product_id })

      return res.json({ message: 'Produto atualizado com nova imagem!' });
    } else {
      // Se não há nova imagem, atualize apenas os campos exceto thumbnailUrl
      const productRepository = new ProductRepository();
      const productService = new ProductService(productRepository);

      const parsedIngredients = JSON.parse(ingredients);

      await productService.update({
        title,
        description,
        value,
        ingredients: parsedIngredients,
        product_id
      });

      return res.json({ message: 'Produto atualizado sem nova imagem.' });
    }
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