const express = require("express");
const { reset } = require("nodemon");
const Contenedor = require("../src/contenedor");
const knexMsg = require('../src/db-msg');

const app = express();
const { Router } = require("express");
const router = new Router();

let chat = new Contenedor("msg", knexMsg);

router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await chat.getAll();
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

router.post("/", (req, res) => {
  const fecha = new Date();
  let fechaOK = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

  let { message, name } = req.body;

  let newObj = {
    date: fechaOK,
    user: name,
    message,
  };

  async function saveChat(){
    try {
      await chat.save(newObj);
      let aux = await chat.getAll();
      res.send(aux);  
    } catch (err) {
      throw (err);
    }
  }

  (async () => {
    try {
      await saveChat();
    } catch (error) {
      throw error; 
    }
  })();
});

module.exports = router;