"use strict";

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var morgan = require("morgan");
var path = require("path");
var config = JSON.parse(process.env.config);
var fs = require("fs");
var utils = require(path.join(config.baseDirectory, 'utils'));

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

router.route("/")
.get(function(request, response) {
  response.redirect("/watch");
})
.post(function(request, response) {

});

router.route("/load")
.get(function (request, response) {
  var baseDirectory = config.baseDirectory;
  var presentationDirectory = config.presentationDirectory;
  var filepath = path.join(baseDirectory, presentationDirectory);
  fs.readdir(filepath, function(error, files) {
    if(error) {
      response.status(403).send({"success": false, "message": "No token provided"});
    } else {
      var data = {};
      for(var i in files){
        var filename = files[i];
        var content = JSON.parse(fs.readFileSync(path.join(filepath, filename)));
        var id = path.basename(filename, '.pres.json');
        data[id]=content;
      }
      response.json({"success": true, "data": data});
    }
  });
});


router.route("/save")
.post(function (request, response){
  var presentation = request.body.presentation;
  if( !utils.isEmpty(presentation)) {
    var id = presentation;
    response.status(200).json({"success": true, "message": "presentation successfully sent"});
  } else {
    response.status(400).json({"success": false, "message":"presentation was either empty or not found in request body"});
  }
});



module.exports = router;
