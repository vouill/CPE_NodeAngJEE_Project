module.exports = IOController;

var io;
var listener;

function IOController(){ }

IOController.listen = function(server){
	io = require("socket.io")(server);
	listener = io.listen(server)

	io.on('connection', function(){
		console.log('connection');
	})

	listener.sockets.on('connection', function(){
		console.log('connection');
		socket.emit('message', {'message': 'hello world'});
	})
	//console.log(io);
};


IOController.lol = function(){
	console.log(io);
}