const express = require("express");
const productsRoute = require("./routes/products");
const path = require("path");

const app = express();
// Método para reconocer el objeto de solicitud entrante como objeto JSON
app.use(express.json())
// Helper para el parseo de peticiones http
app.use(express.urlencoded({extended:false}));

// funcion middleware incorporado de express para servir archivos estaticos
app.use("/static", express.static(__dirname + "/public"));

const PORT = 3030;

app.use("/api", productsRoute);

console.log(__dirname);

app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
})
