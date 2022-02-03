const express = require('express');
const { Contenedor } = require('../clase4-actividad/clase4-actividad');

const app = express();
const PORT = 3030;

let container = new Contenedor('test.txt');

app.get('/productos', async (req, res) => {
  res.send(await container.getAll());
});

app.get('/productosRandom', async (req, res) => {
  res.send(await container.getRandom());
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})