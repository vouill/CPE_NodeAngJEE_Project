module.exports = IOController;

var io;
var listener;

var map = {},
numOfUsers = 0;

function IOController(){ }

IOController.listen = function(server){
	io = require("socket.io")(server);
	listener = io.listen(server)

	listener.sockets.on('connection', function(socket){
		console.log('connection');
		numOfUsers += 1;
 		
		socket.on('data_comm', function (data_comm) {
			map[socket.id] = socket;
			//console.dir(map);
    	});

    	socket.on('slidEvent', function (slidEvent){
    		switch(slidEvent.CMD){
    			case 'START':
    				console.log('start pres: ' + slidEvent.PRES_ID);
    				socket.emit('slidEvent', 'yooooo');
    				break;

				case 'PAUSE':
    				break;

				case 'END':
    				break;

				case 'BEGIN':
    				break;

				case 'PREV':
    				break;

				case 'NEXT':
    				break;

    			default:
    				break;
    		}
    	});
	});
};