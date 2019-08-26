//Require express module
const express = require("express");
const bodyParser = require("body-parser"); 

//Connect express app to MongoDB
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost/url-shortener";
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log('Error', err);
  console.log('Connected to MongoDB')
});

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

//initializes the schema from models/UrlShortener.js
require('./models/UrlShortener.js');

// Initializing the routes/urlshortener.js file will route the two APIs to their corresponding files
require("./routes/urlshortener")(app);

const PORT = 7000;
// Start server on Port 700
app.listen(PORT, () => {
  console.log("App is listening to port: ", PORT);
});
