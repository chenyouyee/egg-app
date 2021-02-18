const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require('./db/models')

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Hello world" });
//   // res.send("test message")
// });

// load in our routes, passing in `app` as parameter
require("./routes/goalRoutes")(app); 
require("./routes/subgoalRoutes")(app);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  sequelize
    .authenticate()
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err))
});