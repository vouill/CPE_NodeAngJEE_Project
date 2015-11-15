'use strict';

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var utils = require("./app/utils/utils.js");
var SlidModel = require("./app/models/slid.model.js");

var slid = new SlidModel();

slid.id = utils.generateUUID();
slid.type = "myType";
slid.title = "myTitle";
slid.fileName = slid.id + ".txt";
slid.setData("It Works !");

console.dir(SlidModel);
console.log("----------");
console.dir(slid);

function test1(slid) {
	console.log("====== TEST 1 =======");
	SlidModel.create(slid, function(err) {
		if (err) {
			console.error(err);
		} else {
			test2(slid);
		}
	});
}

function test2(slid) {
	console.log("====== TEST 2 =======");
	SlidModel.read(slid.id, function(err, data) {
		if (err) {
			console.error(err);
		} else {
			console.log(data);
			test3(slid);
		}
	});
}

function test3(slid) {
	console.log("====== TEST 3 =======");
	slid.title = "MOD_title";
	slid.setData(slid.getData() + " YES,  IT IS !!!");

	SlidModel.update(slid, function(err) {
		if (err) {
			console.error(err);
		} else {
			console.dir(slid);
			test4(slid);
		}
	});
}

function test4(slid) {
	console.log("====== TEST 4 =======");

	SlidModel.delete(slid.id, function(err) {
		if (err) {
			console.error(err);
		} else {
			console.dir("Slid supprimee");
			testErr(slid);
		}
	});

}

function testErr(slid) {
	console.log("====== TEST ERROR =======");
	var slidTest = new SlidModel(12);
	console.dir(slidTest);

	test1(12);
	slid.id = null;
	test1(slid);
	test2(slid);
	test3(slid);

	slid.id = 12;
	test3(slid);
}

(function() {
	test1(slid);

	setTimeout(function() {
		console.log("====== END =======");
	}, 1500);
})();