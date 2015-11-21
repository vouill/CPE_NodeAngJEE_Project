module.exports = IOController;


var presHandler = require("./presHandler.js");

var pH = new presHandler();
var io;
var listener;

var map = {},
    numOfUsers = 0;

function IOController() {}

IOController.listen = function(server) {
        io = require("socket.io")(server);

        io.on('connection', function(socket) {
            numOfUsers = numOfUsers + 1;


            socket.on('data_comm', function(data_comm) {
                map[socket.id] = socket;
            });

            //check if pres currently displaying, send pres info if one is being displayed
            if (pH.status) {
                socket.emit('serverMsg', pH.getCurrentSlid());

            }
            //routine from options
            socket.on('slidEvent', function(slidEvent) {
                switch (slidEvent.CMD) {

                    case 'START':

                        currentPres_id = slidEvent.PRES_ID;
                        pH.init(currentPres_id);
                        console.log('starting pres: ' + pH.getPresId());
                        io.emit('serverMsg', pH.getCurrentSlid());

                        break;

                    case 'NEXT':
                        if (pH.nextSlid()) {
                            io.emit('serverMsg', pH.getCurrentSlid());
                        }

                        break;

                    case 'PREV':
                        if (pH.prevSlid()) {
                            io.emit('serverMsg', pH.getCurrentSlid());
                        }

                        break;
                    case 'END':
                    pH.endPres();
                    io.emit('serverMsg',null);

                    break;
                    default:
                        break;
                }
            });

            socket.on('disconnect', function(){
                numOfUsers = numOfUsers - 1;
            console.log('user disconnected'+ numOfUsers);
           
            //todo delete entry map
           });


            console.log("user nb " + numOfUsers);
        });


        };


