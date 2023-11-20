const knex = require("../database/knex")

class SessionRepository {
  async findByFavorite(user_id) {
    const favorite = await knex("favorites").where({ user_id })

    return favorite
  }

  async findByAlreadyFavoriteProduct(user_id, product_id) {
    const favorite = await knex("favorites").where({ user_id, product_id });
    return favorite;
  }

  async create({ user_id, product_id }) {
    const [favoriteId] = await knex("favorites").insert({
      user_id,
      product_id
    })
    return { id: favoriteId }
  }

  async delete(id) {
    const deleteFavorite = await knex("favorites").where({ id }).delete();

    return deleteFavorite
  }
}


module.exports = SessionRepository