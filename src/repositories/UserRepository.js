const knex = require("../database/knex")

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user
  }

  async create({ name, email, password }) {
    const userId = await knex("users").insert({
      name,
      email,
      password
    })
    return { id: userId }
  }

  async userId(user_id) {
    console.log(user_id)
    const user = await knex("users").where("id", "=", user_id).first();

    return user
  }

  async update(user, user_id) {
    const updatedUser = await knex("users").update(user)
      .where("id", "=", user_id);

    return updatedUser
  }

  async findByUser(user) {
    const checkUserExists = await knex("users").where({ id: user.id });

    return checkUserExists
  }
}
module.exports = UserRepository