const mysql = {
  client: 'mysql',
  connection: {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'password',
    database : 'ecommerce'
  },
  pool: { min: 2, max: 8}
};

export default mysql; 