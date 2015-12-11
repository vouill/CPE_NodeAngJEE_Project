angular.module('watcherApp').controller('watcherController', ['$scope', 'Socket', function($scope, Socket) {


   Socket.on('serverMsg', function(message) {
       console.log(message);
   });

   socket.emit('slidEvent', {CMD: 'START', PRES_ID:'efa0a79a-2f20-4e97-b0b7-71f824bfe349'});

   Socket.on('serverMsg', function (data) {
     console.dir(data);
     $scope.slide.title = data.title;
     $scope.slide.text = data.text;
     $scope.slide.content = data.content;
   });
   $scope.slide = {
     title: 'title',
     text: 'text'
   }
  }

]);
angular.module('adminApp').controller('playerController',
function($scope, $routeParams, $log, Socket) {


  var uuid = $routeParams.uuid;




  $scope.play = function() {
    $log.info("play");
    Socket.emit('slidEvent', {CMD: 'START', PRES_ID: uuid});
  }

  $scope.stop = function() {
    $log.info("pause");
    Socket.emit('slidEvent', {CMD: 'END'});
  }

  $scope.next = function() {
    $log.info("next");
    Socket.emit('slidEvent', {CMD: 'NEXT'});

  }


  $scope.previous = function() {
    $log.info("previous");
    Socket.emit('slidEvent', {CMD: 'PREV'});

  }

})
.$inject = ['$scope', '$log', '$routeParams', 'auth', 'Content', 'Slide', 'Presentation', 'utils'];
