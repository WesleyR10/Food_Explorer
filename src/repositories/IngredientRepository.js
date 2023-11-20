const knex = require("../database/knex")


class IngredientRepository {
  async findByAllIngredients() {
    const ingredient = await knex("ingredients")
    return ingredient
  }

  async findDishIngredient(product_id) {
    const ingredient = await knex("ingredients").where({ product_id });
    return ingredient
  }
}

module.exports = IngredientRepository