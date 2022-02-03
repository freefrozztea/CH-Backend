const express = require('express');
const router = express.Router();

const { Contenedor } = require("../../Contenedor");
const container = new Contenedor("products.txt");

router.get("/", async (req, res) => {
  const products = await container.getAll();

  res.render("products", {
    prods: products,
    pageTitle: "Productos",
    path: "/",
  });
});

exports.router = router;