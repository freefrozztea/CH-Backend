const express = require("express");
const router = express.Router();

router.get("/form", (req, res) => {
  res.render("form", {
    pageTitle: "Forms"
  });
});

module.exports = router;