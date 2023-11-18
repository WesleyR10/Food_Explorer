const knex = require("../database/knex")

class SessionRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user
  }
}

module.exports = SessionRepository