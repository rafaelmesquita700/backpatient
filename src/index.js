require("dotenv").config()
const express = require("express")
const routesPatient = require("./routes/routerPatient")
const config = require("config")
const dataBase = require("../config/db")

const app = express()

app.use(express.json())

// Routes
app.use(routesPatient)

const port = config.get("port")

app.listen(port, async () => {
  await dataBase()

  console.log(`Server running on the port: ${port}`)
})
