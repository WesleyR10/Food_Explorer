const knex = require("../database/knex")

class FavoriteRepository {
  async findByFavorite(user_id) {
    const favorite = await knex("favorites").where({ user_id })

    return favorite
  }

  async findById(favoriteId) {
    const favorite = await knex("favorites").where({ id: favoriteId }).first();
    return favorite;
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

  async delete({ user_id, product_id }) {
    const deleteFavorite = await knex("favorites").where({ user_id, product_id }).delete();

    return deleteFavorite
  }
}


module.exports = FavoriteRepository