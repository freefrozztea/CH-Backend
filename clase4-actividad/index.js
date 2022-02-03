const Contenedor  = require('./clase4-actividad');

const fs = require('fs');

const data = fs.readFileSync('./test.txt', 'utf-8');

console.log(data);