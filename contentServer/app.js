"use strict";

var express = require("express");
var morgan = require("morgan");
var http = require("http");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();

var router = express.Router();
var config = require("./config.json");
config.baseDirectory = __dirname;


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

process.env.config = JSON.stringify(config);


app.use("/", require("./app/routes/defaultRoute.js"));
app.use("/admin", express.static(path.join(__dirname, "public/dist/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/dist/watch")));

var server = http.createServer(app);
server.listen(config.port, function() {
  console.log("kiwiNinja listening to port "+config.port);
});
