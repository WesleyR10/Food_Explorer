const knex = require("../database/knex")

class ProductRepository {
  async findByNameProduct(title) {
    const productName = await knex("products").where({ title }).first();

    return productName
  }

  async findByAllProducts() {
    const products = await knex("products")
    return products
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

  async delete(id) {
    const product = await knex("products").where({ id }).delete();

    return product
  }

  async findByIdProduct(product_id) {
    const product = await knex("products").where("id", "=", product_id).first();

    return product
  }

  async update(updatedProduct, product_id) {
    const { ingredients: newIngredients, ...otherFields } = updatedProduct;
    // Atualiza os campos exceto ingredients
    const updated = await knex("products").where("id", "=", product_id).update(otherFields)

    // Obtém os ingredientes existentes para o produto
    const existingIngredients = await knex("ingredients")
      .where("product_id", "=", product_id)
      .select("name");

    const existingIngredientNames = existingIngredients.map(ingredient => ingredient.name);
    // Encontra os ingredientes a serem removidos (não presentes nos novos ingredientes)
    const ingredientsToRemove = existingIngredientNames.filter(
      name => !newIngredients.includes(name)
    );

    // Encontra os ingredientes a serem adicionados (presentes nos novos ingredientes e não nos existentes)
    const ingredientsToAdd = newIngredients.filter(
      name => !existingIngredientNames.includes(name)
    );

    // Remove os ingredientes a serem removidos
    if (ingredientsToRemove.length > 0) {
      await knex("ingredients")
        .where("product_id", "=", product_id)
        .whereIn("name", ingredientsToRemove)
        .del();
    }

    // Adiciona os ingredientes a serem adicionados
    if (ingredientsToAdd.length > 0) {
      const ingredientsInsert = ingredientsToAdd.map(name => {
        return {
          product_id,
          name,
        }
      });

      await knex("ingredients").insert(ingredientsInsert);
    }

    return updated;
  }
}

module.exports = ProductRepository 