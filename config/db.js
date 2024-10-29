const mongoose = require("mongoose");
const config = require("config");

async function connect() {
  const dataBase = config.get("dataBase")

  try {
    await mongoose.connect(dataBase)
    console.log("Connected to the database!")
  } catch (error) {
    console.log("Not possible connect to the database!")
    console.log(`Erro: ${error}`)
  }
}

module.exports = connect
