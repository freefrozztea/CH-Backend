require("dotenv").config();

const environment = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || "",
  SECRET: process.env.SECRET || ""
}

module.exports = environment;