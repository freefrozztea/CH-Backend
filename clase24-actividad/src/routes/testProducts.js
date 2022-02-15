const express = require("express");
const faker = require("faker")

const app = express();
const { Router } = express;
const router = new Router();



router.get("/", (req, res) => {
    //creo un array vacio, le pusheo unos productos con faker y lo envio
    let arrayPtos = [];
    
    for (let index = 0; index < 5; index++) {
        arrayPtos.push({
            titulo: faker.commerce.product(),
            precio: faker.commerce.price(),
            thumbail: faker.image.image()
        })
    }

    res.send(arrayPtos);
});

module.exports = router;