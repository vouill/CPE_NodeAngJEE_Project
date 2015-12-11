console.log("It Works !")

var http = require("http");
var path = require("path");
var fs = require('fs');
var rdd = require("./rdd.js");
var express = require('express');
var SlidModel = require('./app/models/slid.model.js');
var SlidController = require('./app/controllers/slid.controller.js');
var IOController = require('./app/controllers/io.controller.js');
var utils = require("./app/utils/utils.js");
var	io = require("socket.io");

var bodyParser = require('body-parser');
var morgan = require("morgan");

var app = express();


//init config here and in whole porject.
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

//init server
var server = http.createServer(app);
IOController.listen(server);


//Custom module manage presentations
presmodule=rdd();


server.listen(CONFIG.port, function() {
	console.log("listening to "  + CONFIG.port);
});

//init default route
var defaultRoute = require("./app/routes/default.route.js");
var slidRoute = require("./app/routes/slid.route.js");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(defaultRoute);
app.use(slidRoute);

//TODO refactored
app.use("/admin", express.static(path.join(__dirname, "public/dist/templates/admin"))); //html
app.use("/admin", express.static(path.join(__dirname, "public/dist/"))); //resources

app.use("/uploads", express.static(path.join(__dirname, "uploads/"))); //resources

app.use("/watch", express.static(path.join(__dirname, "public/dist/templates/watch"))); //html
app.use("/watch", express.static(path.join(__dirname, "public/dist/"))); //ressources

app.use("/login", express.static(path.join(__dirname, "public/dist/templates/login"))); //html
app.use("/login", express.static(path.join(__dirname, "public/dist/"))); //ressources

app.get("/Loadpres",  function (request, response) {
  //  console.log(CONFIG.presentationDirectory);
		presmodule.fileListFilter(function(data){
			var jsonObj = JSON.parse(data);
			response.send(jsonObj);
		});
});


app.post("/savePres",  function (request, response) {
	presmodule.prescreator(request.body, function(data){
		//TODO ?
	});
  response.send('test id = ' + request.body.id);
});



app.get("/testModel", function(request, response){
	var slid = new SlidModel();

	slid.id = utils.generateUUID();
	slid.type = "myType";
	slid.title = "myTitle";
	slid.fileName = slid.id + ".txt";
	slid.setData("It Works !");

	SlidModel.create(slid, function(err){
		console.error(err);

		SlidModel.delete(slid.id, function(err){
		console.error(err);
		});
	});

	response.send();
});

app.get("/testController", function(request, response){
	console.log("testController");

	SlidController.list(function(data){
		var json = data;
		console.log(json.toString());
	});

	response.send();
});
