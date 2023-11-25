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
    const productsByCategory = await knex("category")
      .leftJoin("products", "category.id", "products.category_id")
      .select('category.id as category_id', 'category.name as category_name', 'products.id as product_id', 'products.title', 'products.thumbnailUrl', 'products.description', 'products.value', 'products.category_id as product_category_id')
      .distinct('category.id');

    // Organizar os produtos por categoria
    const productsGroupedByCategory = {};

    productsByCategory.forEach((row) => {
      const categoryId = row.category_id;

      if (!productsGroupedByCategory[categoryId]) {
        productsGroupedByCategory[categoryId] = {
          id: categoryId,
          name: row.category_name,
          products: [],
        };
      }

      const product = {
        id: row.product_id,
        title: row.title,
        thumbnailUrl: row.thumbnailUrl,
        description: row.description,
        value: row.value,
        category_id: row.category_id,
      };

      productsGroupedByCategory[categoryId].products.push(product);
    });

    // Transformar o objeto em array para corresponder ao formato desejado
    const result = Object.values(productsGroupedByCategory);

    return result;
  }

  async findByTitleOrIngredientName(searchTerm) {
    const products = await knex("products")
      .leftJoin("ingredients", "products.id", "ingredients.product_id")
      .where('products.title', 'like', `%${searchTerm}%`)
      .orWhere('ingredients.name', 'like', `%${searchTerm}%`)
      .select('products.*', 'ingredients.name as ingredient_name')
      .distinct('products.id');
    return products;
  }
}

module.exports = CategoryRepository