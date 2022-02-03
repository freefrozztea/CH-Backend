const { urlencoded } = require('express');
const express = require('express');
const app = express();
require('dotenv').config();

// HTTP Server
const http = require('http');
const httpServer = http.createServer(app);

app.use(express.static(__dirname + '../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Socket.io
const { Server: IOServer } = require('socket.io');
const io = new IOServer(httpServer);

// Routes
const productsRoute = require('../routes/product');
app.use('/api/products', productsRoute);
const msgRoute = require('../routes/msg');
app.use('/api/chat', msgRoute);

app.get("/", (req, res)=>{
  res.sendFile('index.html', { root: './public' });
})

// Port
const PORT = process.env.PORT || 8080;




io.on("connection", (socket) => {
  console.log("User has joined successfully");
  
  socket.emit("render", "Hola Cliente");
  socket.on("actualizacion", () => {
    io.sockets.emit("render", "Actualizacion");
  })
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
httpServer.on('error', (err) => console.log(`Error in server: ${err}`));