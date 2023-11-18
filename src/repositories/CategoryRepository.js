const knex = require("../database/knex")

class CategoryRepository {
  async findByNameCategory(name) {
    const user = await knex("category").where({ name }).first();

    return user
  }

  async create({ name, position }) {
    const categoryId = await knex("category").insert({
      name,
      position
    })

    return { id: categoryId }
  }

  async findByAllCategory() {
    const category = await knex("category")
    return category
  }
}

module.exports = CategoryRepository