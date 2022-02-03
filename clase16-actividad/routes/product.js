const express = require("express");
const { reset } = require("nodemon");
const Contenedor = require("../src/contenedor");
const knexProd = require('../src/db-prod');

const app = express();
const { Router } = express;
const router = new Router();

let productos = new Contenedor("products", knexProd);

router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await productos.getAll();
      res.send(aux);
    } catch(error){
      throw error;
    }  
  }    
  
  (async () => {
    try {
      await getTodos();
    } catch (err) {
      console.error(err);
    }
  })();

});

router.get("/:id", (req, res) =>{
  async function getxId(){
    try{
      let ptoId = await productos.getById(parseInt(req.params.id));
      res.send(ptoId);
    }   catch(error){
      throw error;
    }
  };

  (async () => {
    try {
      await getxId();
    } catch (err) {
      throw (err);
    }
  })();
});

router.post("/", (req, res) => {
  let { title, price, thumbnail } = req.body;
  let newObj = {
    title,
    price,
    thumbnail,
  };

  async function savePto(){
    try {
      await productos.save(newObj);
      let aux = await productos.getAll();
      res.send(aux);     
    } catch (error) {
      throw Error("Error en post productos");
    }
  }

  (async () => {
    try {
      await savePto();
    } catch (err) {
      console.error(err);
    }
  })();
});

router.put("/:id", (req, res) =>{
  let { titulo, precio, thumbail } = req.body;

  async function modfPto(){
    ptoMod = {
      titulo,
      precio,
      thumbail
    }
    try {
      await productos.update(parseInt(req.params.id), ptoMod);
      ptoMod =  await productos.getById(parseInt(req.params.id));
      res.send(ptoMod);
    } catch (error) {
      throw Error("Error en put modificacion productos");
    }
  }

  (async () => {
    try {
      await modfPto();
    } catch (err) {
      throw err;
    }
  })();

})

router.delete("/:id", (req,res) =>{
  async function deletexId(){
    try {
      let flag = await productos.deleteById(parseInt(req.params.id));
      if (flag != 0) {
        res.send({message: "Producto con id: " + req.params.id + "borrado correctamente"});
      } else{
        res.send({ error : 'Producto no encontrado' });
      }
    } catch (error) {
      throw Error ("Error en el delete por id");
    }
  }

  (async () => {
    try {
      await deletexId();
    } catch (err) {
      throw err;
    }
  })();
})

module.exports = router;