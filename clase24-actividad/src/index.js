const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { PORT, MONGODB_URI, SECRET } = require("./environment/index");

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    mongoOptions: advancedOptions
  }),
  cookie: { maxAge: 100000 },
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true
}))

const chatRoute = require("./routes/chat")
app.use("/api/chat", chatRoute);

const testProducts = require("./routes/testProducts")
app.use("/api/test-products", testProducts);

const login = require("./routes/login")
app.use("/api/login", login)

const logout = require("./routes/logout")
app.use("/api/logout", logout)

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("render", "")
  socket.on("NewChat", () => {
    io.sockets.emit("render", "")
  })
})


server.listen(PORT, () => {
  console.log(`Server is run on port ${PORT} --> http://localhost:${PORT}`);
})
server.on('error', error => console.log(`Error en servidor: ${error}`))