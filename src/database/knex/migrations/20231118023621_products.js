exports.up = knex => knex.schema.createTable("products", table => {
  table.increments("id");
  table.text("title").notNullable();
  table.text("thumbnailUrl").notNullable();
  table.text("description").notNullable();
  table.real("value").notNullable();
  table.integer("category").references("id").inTable("category")

  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("products");
