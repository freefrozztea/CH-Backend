const express = require("express");

const { Router } = express;

// Creamos un objeto de enrutador, instancia aislada de middleware y rutas
const router = new Router();
const { Contenedor } = require("../Contenedor");

const container = new Contenedor("products.txt");


router.get("/products/:id", async (req, res) => {
  res.send( await container.getById(req.params.id));
});

// req.params es un objeto que contiene como propiedades los path params
router.put("/products/:id", async (req, res) => {
  res.send( await container.updateById(req.params.id, req.body));
});

router.delete("/products/:id", async (req, res) => {
  res.send( await container.deleteById(req.params.id));
});

router.get("/products", async (req, res) => {
  res.send( await container.getAll());
});

// req.body es un objeto que contiene el body de la petición, puede ser un string o un json
router.post("/products", async (req, res) => {

  try {
    let result = await container.save(req.body);
    res.send( `El Producto Fue Agregado Correctamente con el ID: ${result}`);
  } catch (error) {
    throw console.error(error);
  }

});

module.exports = router;