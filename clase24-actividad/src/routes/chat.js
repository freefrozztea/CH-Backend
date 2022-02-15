const express = require("express");
const Container = require("../daos/ChatDAOFirebase");
const { normalize, schema, denormalize } = require("normalizr");

const app = express();
const { Router } = express;
const router = new Router();

let chat = new Container;

router.get("/", (req, res) => {
  async function getChats() {
    try {
      let aux = await chat.getAll();
      console.log(aux);

      const schemaAutor = new schema.Entity('author');
      const mySchema = new schema.Array({
        author: schemaAutor
      });

      const normalizedChat = normalize(aux[0].chats, mySchema);

      const denormalizeChat = denormalize(normalizedChat.result, mySchema, normalizedChat.entities);

      res.send({ normalizr: normalizedChat });

    }
    catch (error) {
      console.log(error);
    }
  }
  getChats();
});

router.post("/", (req, res) => {

  async function saveChat() {
    try {
      let aux = await chat.getAll();
      // if (aux.length == 0){
      //   aux = [];
      //   aux.push = {
      //     chats: []
      //   }
      // }         
      aux[0].chats.push(req.body);
      await chat.update(aux[0])
      res.send('chat agregado ok');
    } catch (error) {
      console.log(error);
    }
  }
  saveChat();
});

module.exports = router;