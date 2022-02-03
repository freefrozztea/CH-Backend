const express = require('express');
const app = express();
const chatRoute = require('./routes/chat');
const formRoute = require('./routes/form');
const path = require('path');
const fs = require('fs');


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// HTTP Server
const { Server: HttpServer} = require('http');
const httpServer = new HttpServer(app);
// const http = require('http');
// const server = http.createServer(app);
// console.log(server);

const PORT = process.env.PORT || 3030;

// Routes
app.use('/', chatRoute);
app.use('/', formRoute);

// Socket.io Server
const { Server: IOServer } = require('socket.io');
const io = new IOServer(httpServer);

io.on("connection", (socket) => {
  const arrayMsg = fs.readFileSync(__dirname + "/message.txt", "utf8");
  const msn = JSON.parse(arrayMsg);

  socket.emit("message_back", msn);

  socket.on("data_client", (data) => {
    async function writeActualFile() {
      const msgrecived = await fs.promises.readFile(__dirname + "/message.txt", "utf8");
      const obj = JSON.parse(msgrecived);
      obj.push(data);
      await fs.promises.writeFile(__dirname + "/message.txt", JSON.stringify(obj, null, 2));
      const newArrayMsg = await fs.promises.readFile(__dirname + "/message.txt", "utf8");
      const newMsn = JSON.parse(newArrayMsg);
      io.sockets.emit("message_back", newMsn);
    }

    ( async () => {
      try {
        await writeActualFile();
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const arrayProds = fs.readFileSync(__dirname + "/products.txt", "utf8");
  const prods = JSON.parse(arrayProds);

  socket.emit("products_back", prods);

  socket.on("data_products", (dataProds) => {
    async function writeProds() {
      const prodsRecived = await fs.promises.readFile(__dirname + "/products.txt", "utf8");
      const obj = JSON.parse(prodsRecived);
      obj.push(dataProds);
      await fs.promises.writeFile(__dirname + "/products.txt", JSON.stringify(obj, null, 2));
      const newarrayProds = await fs.promises.readFile(__dirname + "/products.txt", "utf8");
      const newProds = JSON.parse(newarrayProds);
      io.sockets.emit("products_back", newProds);
    }

    (async () => {
      try {
        await writeProds();
      } catch (err) {
        console.error(err);
      }
    })();
  });
});

// Start Server
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})