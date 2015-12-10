var fs = require('fs');
var pathmod = require('path');

var CONFIG = require("./config.json");



module.exports = function() {

return {
	fileListFilter: function(cb) {//List all the presentation
  	if(cb){
			var list={};
			fs.readdir(CONFIG.presentationDirectory, function (err, files) {
				if (err) throw err;

				for(i=0;i<files.length;i++) {
					if(".json"==pathmod.extname(files[i])) {
							var obj=JSON.parse(fs.readFileSync(CONFIG.presentationDirectory+'/'+files[i]));
						//	var objtosend ={'id': obj.id,'value':obj}
							list[obj.id]= obj;
						//	list.push(objtosend);
					}
				}
				cb(JSON.stringify(list));
				})
			}
  	},

  	prescreator: function(jsonstr,cb) {
  		if(cb){
  			fs.writeFileSync(CONFIG.presentationDirectory+'/'+jsonstr.id+'.pres.json',JSON.stringify(jsonstr));
			}
		}
};
}
