const express = require("express");
const router = express.Router();

const { Contenedor } = require("../../Contenedor");
const container = new Contenedor("products.txt");

router.get("/add-product", (req, res) => {
  res.render("add-product", {
    pageTitle: "Agregar Producto",
    path: "/products/add-product",
  });
});

router.post("/add-product", async (req, res) => {
  await container.save({ title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail });
  res.redirect("/products/");
});


exports.router = router;
