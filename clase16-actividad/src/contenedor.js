class Contenedor {

  constructor(name, knex) {
    this.name = name;
    this.knex = knex;
  }

  async save(product) {
    this.knex(this.name).insert(product)
      .then(() => {
        console.log("Register ok!");
      })
      .catch((err) => {
        throw err;
      })
  }

  async getById(id) {
    try{
      let data = await this.knex.from(this.name).select().where({ id: id });
      data = data[0];
      data = {id: data.id, titulo: data.title, precio: data.price, thumbnail: data.thumbnail};
      return data;
    } catch(err){
      throw err;
    }
  }

  async getAll() {
    try {
      let data = await this.knex.from(this.name).select("*").orderBy('id', 'ascd');
      data = data.map((prod) => {
        return { id: prod['id'], title: prod['title'], price: prod['price'], thumbnail: prod['thumbnail'] };
      });
      return data;
    } catch (err){
      throw err;
    }
  }

  async deleteById(id) {
    try {
      let eliminado = await this.knex.from(this.name).where({ id: id }).del();
      console.log(`El producto ${eliminado} ha sido eliminado`);
      return eliminado;
    } catch(err) {
      throw err;
    }
  }

  async deleteAll() {
    this.knex(this.name).del()
      .then(() => {
        console.log("Table deleted!");
      })
      .catch((err) => {
        throw err;
      });
  }

  async update(id, product) {
    try {
      let actualizacion = await this.knex.from(this.name).select().where({ id: id }).update({ title: product.title, price: product.price, thumbnail: product.thumbnail });
      console.log(`El producto ${actualizacion} ha sido actualizado`);
      return actualizacion;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Contenedor;