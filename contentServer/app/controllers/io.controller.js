module.exports = IOController;

var io;
var listener;

var map = {},
numOfUsers = 0;

function IOController(){ }

IOController.listen = function(server){
	io = require("socket.io")(server);
	listener = io.listen(server)

	io.on('connection', function(){
		console.log('connection');
	})
/*
	listener.sockets.on('connection', function(socket){
		console.log('connection');
		socket.emit("message","hello world");
		socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
    });
	})*/

		listener.sockets.on('connection', function(socket){
		console.log('connection');
		numOfUsers += 1;
 		var user = map["user" + numOfUsers] = {};
		
		socket.on('data_comm', function (data_comm) {
        console.log('id :' + data_comm.id +"value"+ data_comm.value );

         
   
    
        user.id = data_comm.id;
        user.value = data_comm.value;
       console.log(user);

    });
	})

	//console.log(io);
};


IOController.lol = function(){
	console.log(io);
}