angular.module('watcherApp').controller('watcherController',
  ['$scope', function($scope) {
    //$scope.socket = io.connect('http://localhost:1337');
    $scope.message = "yoyoyo."

    console.dir($scope)

    /*$scope.socket.on('serverMsg', function(message) {
        //alert('Le serveur a un message pour vous : ' + message);
        $scope.message = JSON.stringify(message);
    });*/
  }

]);