exports.up = knex => knex.schema.createTable("favorites", table => {
  table.increments("id");
  table.text("user_id").references("id").inTable("users").notNullable();
  table.text("product_id").references("id").inTable("products").notNullable();

  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("favorites");
