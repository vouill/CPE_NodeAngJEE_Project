module.exports = SlidController;

var SlidModel = require('../models/slid.model.js');
var CONFIG = require("../../config.json");
var path = require("path");
var fs = require('fs');
var async = require('async');

function SlidController(){ };

SlidController.list = function(callback){
	var json = [];

	fs.readdir(CONFIG.contentDirectory, function(err, buffer_dir){
		
		if(err){
			callback(err);
		}

		async.eachSeries(buffer_dir, function(file, callback) {

			if(path.extname(file) == '.json'){
				//console.log(CONFIG.contentDirectory + '/' + file);
				fs.readFile(CONFIG.contentDirectory + '/' + file, function(err, buffer_file){
					if(err){
						callback(err);
					}
					else{
						var jsonToAdd = {};
						jsonToAdd[JSON.parse(buffer_file).id] = JSON.parse(buffer_file);
						json.push(jsonToAdd);
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
				console.log("All files has been processed");
				callback(err, json);
			}
		});
	});
}

SlidController.create = function(id, type, title, fileName, data, callback){
	var slid = new SlidModel();

	slid.id = id;
	slid.type = type;
	slid.title = title;
	slid.fileName = fileName;	
	slid.setData(data);

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
	var slid = new SlidModel();

	SlidModel.read(id, function(err, data){
		if(err){
			callback(err);
		}else{
			slid = data;

			if(json){
				callback(err, data)
			}
			else{
				data = slid.getData
				callback(err, data);
			}
		}
	});
}