let admin = require('firebase-admin');
const config = require('../config');
const { v4: uuid4 } = require("uuid");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: "https://ecommerce-coderhouse.firebaseio.com"
});

const db = admin.firestore();

class FirebaseContainer {

  constructor(name) {
    this.coleccion = db.collection(name)
  }

  async getAll() {
    try {
      const result = [];
      const data = await this.coleccion.get();
      data.forEach(doc => {
        result.push({ id: doc.id, ...doc.data() });
      });
      console.log(result);
      return result;
    }
    catch (error) {
      console.log(error);
    };
  }

  async getById(id) {
    try {
      let doc = await this.coleccion.doc(id);
      let item = (await doc.get()).data();
      if (item) {
        item.id = id;
        return item;
      } else {
        return false;
      }
    }
    catch (error) {
      throw Error("Error getById() " + error);
    }
  }

  async save(chat) {
    try {
      let doc = this.coleccion.doc(`${uuid4()}`)
      await doc.set(chat);
      return { ...chat, id: doc.id };
    }
    catch (error) {
      throw Error("Error save() " + error);
    }
  }

  async update(newChat) {
    try {
      let chats = newChat.chats;
      const actualizado = await this.coleccion.doc(newChat.id).set({ chats });
      return actualizado;
    } catch (error) {
      throw Error("Error update() " + error);
    }
  }

  async deleteById(id) {
    try {
      const item = await this.coleccion.doc(id).delete();
      return item;
    }
    catch (error) {
      throw Error("Error deleteById() " + error);
    }
  }

  async deleteAll() {
    try {
      const docs = await this.getAll();
      const ids = docs.map(d => d.id);
      ids.map(id => this.deleteById(id));
      return { msg: "Deleted ok" };
    }
    catch (error) {
      throw Error("Error deleteAll() " + error);
    }
  }
}

module.exports = FirebaseContainer;