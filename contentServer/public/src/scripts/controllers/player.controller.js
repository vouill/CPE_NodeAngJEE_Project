angular.module('adminApp').controller('playerController', ['$scope', '$routeParams', '$log', 'Socket',
function($scope, $routeParams, $log, Socket) {

  var uuid = $routeParams.uuid;

  $log.info("coucou");




}]);

/*
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

Socket.on('serverMsg', function (data) {
  console.dir(data);
  $scope.slide.title = data.title;
  $scope.slide.text = data.text;
  $scope.slide.content = data.content;
});

$scope.slide = {
  title: 'title',
  text: 'text'
};
*/
