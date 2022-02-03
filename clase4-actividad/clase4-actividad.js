const fs = require('fs');

class Contenedor {

  constructor(filename){
    this.filename = filename;
  }

  async save(objeto){

    // get all products array
    let algo = await this.getAll();

    // update new id and push new object into array
    let id = algo.length + 1;
    objeto.id = id;
    algo.push(objeto);

    // convert into a string 
    let cadena = JSON.stringify(algo);

    // save into txt file
    const saveProduct = async() => {    
      try{
        await fs.promises.writeFile('./test.txt', cadena,'utf-8')
      }
      catch{
        throw new Error ("No se pudo escribir el archivo o no existe");
      }
    }

    await saveProduct();

    return id;
  }

  // async getCorrectString(){
  //   let productos = await this.getAll();
  //   console.log(productos);
  //   console.log(typeof productos);
  //   let result = JSON.stringify(productos);
  //   let algo = JSON.parse(result);
  //   return algo;
  // }

  getRandom = async () => {
    let arr = await this.getAll();
    let id = Math.floor(Math.random() * (arr.length)) + 1;
    return arr.filter(prod => prod.id == id);
  }

  async getById(id){
    let productos = await this.getCorrectString();

    let arreglo = JSON.parse(productos);
    let nuevoArreglo = arreglo.find(x => x.id == id);

    return nuevoArreglo;
  }

  async getAll(){ 
    let data = [];
      try{
        data = await fs.promises.readFile(this.filename, 'utf-8');
        if(data){
          return this.getArrayFromJsonContent(data);
        } else{
          return [];
        }
      }
      catch(err){
        throw err;
      }
  }

  async updateById(id, objeto){

    let array = await this.getAll();

    let newObject = array.filter(x => {
      if(x.id == id){
        x.title = objeto.title;
        x.price = objeto.price;
        x.thumbnail = objeto.thumbnail;
      }
      return x;
    });

    // save into txt file
    const saveProduct = async() => {    
      try{
        await fs.promises.writeFile('./products.txt', newObject,'utf-8')
      }
      catch{
        throw new Error ("No se pudo escribir el archivo o no existe");
      }
    }

  }


  async deleteById(id){
    let productos = await this.getCorrectString();

    let arreglo = JSON.parse(productos);
    let nuevoArreglo = arreglo.filter(x => x.id != id);

    let cadena = JSON.stringify(nuevoArreglo);

    try{
      await fs.promises.writeFile(this.filename, cadena, 'utf-8');
    }
    catch(err){
      throw err;
    }
  }

  deleteAll(){
    let deleteFiles = async() => {
      try{
        await fs.promises.writeFile(this.filename, "[]",'utf-8');
      }
      catch(err){
        throw err;
      }
    }

    deleteFiles();
  }

  getArrayFromJsonContent = (content) => {
    try {
        let array = JSON.parse(content);
        return array;
    } catch (err) {
        console.log("Error converting content to array")
        console.log(err);
    }
  }
}

let pruebita = new Contenedor('./test.txt');
// console.log(pruebita.showArreglo());
// pruebita.deleteAll();
// pruebita.save({"title":"escuadra","price":450}).then((id) =>  console.log(id));
// pruebita.getAll().then((productos) =>  console.log(productos));
// pruebita.deleteById(1);
// pruebita.getById(2).then((producto) =>  console.log(producto));

module.exports = {
  Contenedor
}
