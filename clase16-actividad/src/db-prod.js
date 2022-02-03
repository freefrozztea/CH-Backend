const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "password",
      database: "ecommerce"
    },

    useNullAsDefault: true,

    pool: {
      min: 2,
      max: 8
    }
  }
);

knex.schema
  .createTableIfNotExists("products", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.string("price");
    table.string("thumbnail");
  })
  .then(() => {
    console.log("Table products created");
  })
  .catch((err) => {
    throw err;
  });

module.exports = knex;