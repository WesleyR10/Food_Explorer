const FavoriteRepository = require("../repositories/FavoriteRepository")
const FavoriteService = require("../services/FavoriteService")

class FavoriteController {
  async create(req, res) {
    const { id: product_id } = req.params;
    const user_id = req.user.id;

    const favoriteRepository = new FavoriteRepository();
    const favoriteService = new FavoriteService(favoriteRepository);

    await favoriteService.execute({ product_id, user_id })

    return res.status(201).json()
  }

  async index(req, res) {
    const user_id = req.user.id;

    const favoriteRepository = new FavoriteRepository();
    const favoriteService = new FavoriteService(favoriteRepository);

    const favorite = await favoriteService.findFavorite(user_id)

    return res.status(201).json(favorite)
  }

  async delete(req, res) {
    const { id } = req.params;

    const favoriteRepository = new FavoriteRepository();
    const favoriteService = new FavoriteService(favoriteRepository);

    await favoriteService.deleteFavorite(id)

    return res.status(201).json()
  }
}

module.exports = FavoriteController