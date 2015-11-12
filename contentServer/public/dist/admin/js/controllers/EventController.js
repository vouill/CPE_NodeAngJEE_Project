
angular.module('adminApp').controller('eventController', ["$scope", "$log", "$window", "auth", 'Content', 'Slide', 'Presentation', 'utils',
function($scope, $log, $window, auth, Content, Slide, Presentation, utils) {

  $scope.presentations = Presentation.all();

  $scope.presentation = {
    title: '',
    description: ''
  };

  $scope.createPresentation = function(presentation) {
    var uuid = utils.generateUUID();
    var title = presentation.title;
    var description = 'test';
    var slides = {};
    Presentation.create(uuid, title, description, slides).then(
    function(data) {
      $scope.presentations = Presentation.all();

    }, function(reason) {
      $log.warn("[Warning] "+ reason);
      $log.info('list of valid users: ' +auth.list())
    }, function(update) {
      $log.info("[Notification] "+update);
    });

  }

  $scope.add = function() {
    $log.info("add");
  }

  $scope.save = function() {
    $log.info("save");
  }

  $scope.edit = function() {
    $log.info("edit");
  }

  $scope.remove = function () {
    $log.info("remove");
  }

}]);
