var express = require("express");
var router = express.Router();

router.route('/')
.get(function(request, response){
	response.redirect("/watch");
});

module.exports = router;

// Routing using
/*
	router.route(__PATH__)
	.get()
	.post()
	.put()
	.delete()
	.all()
	.[...]
*/