dbUser = process.env.DB_USER
dbPassword = process.env.DB_PASSWORD

class Default {
  port = 3000
  dataBase = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.yhn22.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
}

module.exports = new Default()
