module.exports = SlidModel;

var util = require('../utils/utils.js');
var CONFIG = require("../../config.json");
var path = require("path");
var fs = require('fs');

function SlidModel(slid){
	
	this.type = (slid && slid.myType) ? slid.type : null;
	this.id = (slid && slid.id) ? slid.id : null;
	this.title = (slid && slid.title) ? slid.title : null;
	this.fileName = (slid && slid.fileName) ? slid.fileName : null;
	
	var data= '';
	
	this.getData = function(){
		return data;
	}
	
	this.setData = function(mydata){
		data = mydata;
	}
};

SlidModel.create = function(slid, callback){
	if(slid.id != null){
		if(callback){
		var content_filePath = util.getDataFilePath(slid.fileName);
		var metaData_filePath = util.getMetaFilePath(slid.id);
		
			fs.writeFile(content_filePath ,slid.getData(), function(err){
				if(err){
					callback(err);
				}else{
					fs.writeFile(metaData_filePath, JSON.stringify(slid), function(err){
						if (err){
							callback(err);
						}
						
						callback();
					});
				}
			});
		}
	}
	else{
		callback('error: id is null!');
	}
}

SlidModel.read = function(id, callback){
	if(id != null){
		if(callback){
			var metaData_filePath = util.getMetaFilePath(id);
			
			fs.readFile(metaData_filePath, function(err, data){
				if (err){
					callback(err, data);
				}
				
				callback(err, data.toString());
			});
		}
	}
	else{
		callback('error: id is null!');
	}
}

SlidModel.update = function(slid, callback){
	if(slid.id != null){
		fs.stat(util.getMetaFilePath(slid.id), function(err,stat){
			console.log("check metadata: " + util.getMetaFilePath(slid.id));

			if(err){
				callback(err);
			}else{
				SlidModel.read(slid.id, function(err, data){
				if(slid != data){
					SlidModel.create(slid, function(err){
						console.error(err);
					});
				}

				callback();
				});
			}
		});
	}
	else{
		callback('error: id is null!');
	}
}

SlidModel.delete = function(id, callback){
	if(id != null){
		if(callback){		
			fs.readdir(CONFIG.contentDirectory, function(err, buffer){
				if(err) throw err;
				buffer.forEach(function(file) {

					if(file.indexOf(id) != -1)
					{
						console.log('String found');
						fs.unlink(CONFIG.contentDirectory + '/' + file, function(err){
							if (err) callback(err);

							callback();
						})
					}
				});
			});
		}
	}
	else{
		callback('error: id is null!');
	}
}

