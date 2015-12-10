var fs = require('fs');
var pathmod = require('path');

var CONFIG = require("../../config.json");



var presHandler = function() {
	this.presId=null;
	this.jsonStrPres=null;
	this.jsonArray=null;
	this.currentSlidNb=0;
	this.currentSlidId ='';
	this.status=false;
};

presHandler.prototype.log=function(){

};

presHandler.prototype.getPresId=function(){
	return this.presId;
};

presHandler.prototype.nextSlid = function() {
	if((this.jsonarray==null)) {
		return false;
	}
	if((this.currentSlidNb==this.jsonarray.length-1))	{
		return false;
	}

	this.currentSlidNb=this.currentSlidNb+1;
	return true;

};

presHandler.prototype.prevSlid = function() {
	if((this.jsonarray==null)) {
		return false;
	}
	if((this.currentSlidNb==0))	{
		return false;
	}

	this.currentSlidNb=this.currentSlidNb-1;
	return true;

};

presHandler.prototype.getCurrentSlid = function() {
	return this.jsonarray[this.currentSlidNb];
};

presHandler.prototype.init=function(currentPresId){
	this.presId=currentPresId;
	this.jsonStrPres=fs.readFileSync(CONFIG.presentationDirectory+'/'+currentPresId+".pres.json");
	var i = 0;
	this.jsonarray = [];

	//Please do not judge us. It is a temporary workaround.
	for(var slide in JSON.parse(this.jsonStrPres).slidArray) {
		this.jsonarray[i++]= JSON.parse(this.jsonStrPres).slidArray[slide];
	}
	this.status=true;

};

presHandler.prototype.endPres = function() {//reset the pres obj
	this.presId=null;
	this.jsonStrPres=null;
	this.jsonArray=null;
	this.currentSlidNb=0;
	this.status=false;
};

module.exports=presHandler;
