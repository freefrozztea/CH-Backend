const options = {
  client: 'sqlite3',
  connection: {
    filename: __dirname + '/../db/ecommerce.db3'
  },
  useNullAsDefault: true,
  pool: { min: 2, max: 8 }
};

export default options;