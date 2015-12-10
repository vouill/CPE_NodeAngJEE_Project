angular.module('watcherApp').controller('watcherController', ['$scope', function($scope) {
   $scope.toto = "message";
   
   var socket = io.connect('http://localhost:1337');

   socket.on('serverMsg', function(message) {
       console.log(message.title);
       $scope.toto = message.title;
   });

   socket.emit('slidEvent', {CMD: 'START', PRES_ID:'efa0a79a-2f20-4e97-b0b7-71f824bfe349'});


  }

]);
