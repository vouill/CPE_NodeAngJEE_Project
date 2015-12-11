module.exports = SlidController;

var SlidModel = require('../models/slid.model.js');
var CONFIG = require("../../config.json");
var path = require("path");
var fs = require('fs');
var async = require('async');
var util = require('../utils/utils.js');

function SlidController(){ };


//SlidController.list = function(request, response){
SlidController.list = function(callback){
	var json = {};

	fs.readdir(CONFIG.contentDirectory, function(err, buffer_dir){

		if(err){
			console.error(err);
			//response.status(500).send(err);
		}

		async.eachSeries(buffer_dir, function(file, callback) {

			if(path.extname(file) == '.json'){
				//console.log(CONFIG.contentDirectory + '/' + file);
				fs.readFile(CONFIG.contentDirectory + '/' + file, function(err, buffer_file){
					if(err){
						callback(err);
					}
					else{
						json[JSON.parse(buffer_file).id] = JSON.parse(buffer_file);
						callback();
					}
				});
			}
			else{
				callback();
			}
		}, function(err){
			if (err) {
				console.error(err);
			}
			else{
			//	console.log("All files has been processed");
				callback(err, json);
			}
		});
	});
}

SlidController.create = function(file, callback){
	var slid = new SlidModel();

	slid.id = util.generateUUID();
	slid.type = file.mimetype;
	slid.title = file.originalname;
	slid.fileName = slid.id + path.extname(file.originalname);

	slid.setData(fs.readFileSync(file.path));

	SlidModel.create(slid, function(err) {
		if (err) {
			console.error(err);
			callback(err)
		}
		else{
			callback();
		}
	});
}

SlidController.read = function(id, json, callback){

		SlidModel.read(id, function(err, data){
		if(err){
			callback(err);
		}else{
			var slid = new SlidModel(JSON.parse(data));

			if(json){
				callback(err, data)
			}
			else{
				data = slid.getData();
				console.log("data='"+data+"'");
				if(data=='')
				{
					var dataData_filePath = util.getDataFilePath(slid.fileName);

					console.log(dataData_filePath);
					data=fs.readFileSync(dataData_filePath);
				}
				callback(err, data);
			}
		}
	});
}
