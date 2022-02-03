const express = require("express");
const { engine } = require("express-handlebars")
const { Contenedor } = require('../Contenedor');

const container = new Contenedor('products.txt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', engine({defaultLayout: 'main', extname: 'hbs'}));
app.use(express.static('public'));

app.set("views", "./views");
app.set("view engine", "handlebars");

const PORT = 3030;

// res.render redirije al usuario a una URL diferente
app.post("/productos", (req, res) => {

  let {
    id,
    title,
    price,
    thumbnail
  } = req.body;
  container.save({ id, title, price, thumbnail});
  res.redirect('/products')
});

// res.render es una funcion usada para renderizar una vista y mandar el HTML renderizado  al cliente
app.get("/products", async (req, res) => {
  res.render("vista", { products: JSON.parse(await container.getAll()) });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})