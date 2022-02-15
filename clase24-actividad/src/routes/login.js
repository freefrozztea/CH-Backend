const express = require("express");
const { PORT } = require("../environment/index");

const app = express();
const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    res.send({ user: req.session.user })
  } else {
    res.send(false);
  }

});

router.post("/", (req, res) => {
  req.session.user = req.body.nombre;
  res.statusCode = 302;
  res.setHeader("Location", `http://localhost:${PORT}`);
  res.end()
});


module.exports = router;