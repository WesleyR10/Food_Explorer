const IngredientRepository = require("../repositories/IngredientRepository")
const IngredientService = require("../services/IngredientService")

class IngredientController {
  async index(req, res) {
    const ingredientRepository = new IngredientRepository();
    const ingredientService = new IngredientService(ingredientRepository);

    const ingredient = await ingredientService.findIngredients()

    return res.status(201).json(ingredient)
  }

  async show(req, res) {
    const { id: product_id } = req.params;
    const ingredientRepository = new IngredientRepository();
    const ingredientService = new IngredientService(ingredientRepository);

    const ingredient = await ingredientService.findDishByIngredient(product_id)

    return res.status(201).json(ingredient)
  }
}

module.exports = IngredientController