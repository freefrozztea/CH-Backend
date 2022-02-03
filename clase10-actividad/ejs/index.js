const express = require("express");
const addProductRoutes = require("./src/routes/addProduct");
const productRoutes = require("./src/routes/product");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs')
app.set('views', './src/views');

app.use('/products', addProductRoutes.router);

app.use('/products', productRoutes.router);

const PORT = 3030;

app.listen(PORT, () => { console.log(`app running on port ${PORT}`) });