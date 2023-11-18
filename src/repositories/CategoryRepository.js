const knex = require("../database/knex")

class CategoryRepository {
  async findByCategory(name) {
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
}

module.exports = CategoryRepository