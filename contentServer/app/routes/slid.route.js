// slid.route.js
var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var SlidModel = require('../models/slid.model.js');
var router = express.Router();

module.exports = router;

var multerMiddleware = multer({"dest": "tmp"});

//router.post("/slids", multerMiddleware.single("file"), SlidController.create(request.file));

router.post("/slids", multerMiddleware.single("file"), function(request, response){
	SlidController.create(request.file, function(err, callback){
		response.sendStatus(200);
	});
});

router.get("/slids", function(request, response){
	console.log("get /slids");

	SlidController.list(function(err,data){
		if(err){
			console.error(err);
		}else{
			console.log(data);
		}

		response.send(data);
	})
});

router.get("/slids/:slidId",function(request, response){
	var id = request.params.slidId;
	var json = request.query.json;

	console.log("get /slids/" + id);

	SlidController.read(id, json, function(err, data){
		if(err){
			console.error(err);
		}else{
			var slid = new SlidModel;
			slid = data;
		}
		response.send(slid);
	});
});
