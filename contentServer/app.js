console.log("It Works !")

var http = require("http");
var path = require("path");
var fs = require('fs');
var express = require('express');
var SlidModel = require('./app/models/slid.model.js');
var SlidController = require('./app/controllers/slid.controller.js');
var utils = require("./app/utils/utils.js");

var bodyParser = require('body-parser');
var morgan = require("morgan");

var app = express();

//init config here and in whole porject.
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

//init server
var server = http.createServer(app);
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
app.use("/admin", express.static(path.join(__dirname, "public/dist/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/dist/watch")));
app.use("/login", express.static(path.join(__dirname, "public/dist/login")));

app.get("/loadPres", function(request, response){
	var json_obj = {};
	
	//fetch presentationDirectory
	fs.readdir(CONFIG.presentationDirectory, function(err_dir, buffer_dir){
		console.log("Content directory: " + buffer_dir.toString());
		
		//loop on all files
		for( var i in buffer_dir)
		{		
			var file_name = buffer_dir[i];
			//select only '.json' files
			if(path.extname(file_name) ==  ".json"){
				console.log("File name: " + file_name.toString());
				
				//read json files
				var buffer_file = JSON.parse(fs.readFileSync(CONFIG.presentationDirectory + "/" + file_name).toString());
				console.log("File content: " + buffer_file.toString());
				
				var pres_id = buffer_file["id"];
				json_obj[pres_id]=buffer_file;
				
				var id = Object.keys(buffer_file)[1];
				console.log("id: " + id);
				
				console.log(buffer_file.id);
			}
		}
		response.json(json_obj);	
	});
})

app.post("/savePres", function(request, response){
	//For the sake of testing with a post method
	var stringRecieved = '';
	
	request.on('data', function (data) {
            stringRecieved += data;
        });
		
	request.on('end', function () {
		console.log(JSON.parse(stringRecieved));
		
		fs.writeFileSync(CONFIG.presentationDirectory + '/' + (JSON.parse(stringRecieved)).id + ".pres.json", stringRecieved);
	});
		
	response.send();
})

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
})

app.get("/testController", function(request, response){
	console.log("testController");

	SlidController.list(function(data){
		var json = data;
		console.log(json.toString());
	});

	response.send();
})