const knex = require("../database/knex")

class ProductRepository {
  async findByProduct(title) {
    const productName = await knex("products").where({ title }).first();

    return productName
  }


  async create({ title, thumbnailUrl, description, value, category, ingredients }) {
    const [product_id] = await knex("products").insert({
      title,
      thumbnailUrl,
      description,
      value,
      category_id: category,
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        product_id,
        name,
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return
  }

  async findByAllProducts() {
    const products = await knex("products")
    return products
  }
}

module.exports = ProductRepository