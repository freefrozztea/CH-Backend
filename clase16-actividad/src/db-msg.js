const knex = require("knex");

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/msg.db3'
    }
  },
  useNullAsDefault : true,

  pool: {min:2, max:8}
};

const dbMessage = knex(config.development)

dbMessage.schema
  .createTable("msg", function(table){
    table.increments("id").primary();
    table.string("date");
    table.string("message");
    table.string("user");
  })
  .then(() => {
    console.log("Table message created");
  })
  .catch((err) => {
    throw err;
  });


module.exports = dbMessage;