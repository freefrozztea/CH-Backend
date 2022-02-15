const express = require("express");
const { PORT } = require("../environment/index");

const app = express();
const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
  req.session.destroy((err =>{
    if (err) console.log("Error al desloguearse")
    res.statusCode = 302;
    res.setHeader("Location", `http://localhost:${PORT}`);
    res.end()
  }))
});


module.exports = router;