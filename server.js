const { sequelize } = require('./src/db/models')
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(4000, function() {
    console.log('Listening on port 4000 :)')
    sequelize
          .authenticate()
          .then(() => console.log("Database connected!"))
          .catch((err) => console.log(err))
})