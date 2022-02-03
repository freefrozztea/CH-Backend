exports.up = function(knex) {
  knex.schema
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
};

exports.down = function(knex){ };


