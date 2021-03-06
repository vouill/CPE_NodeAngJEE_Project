
angular.module('adminApp').controller('eventController', ["$scope", "$log", "$window", "auth", 'Content', 'Slide', 'Presentation', 'utils',
function($scope, $log, $window, auth, Content, Slide, Presentation, utils) {

  $scope.presentations = Presentation.all();

  $scope.presentation = {
    title: '',
    description: ''
  };

  $scope.slides = {}

  $scope.createPresentation = function(presentation) {
    var uuid = utils.generateUUID();
    var title = presentation.title;
    var description = presentation.description;
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

  $scope.createSlide = function(slide) {
    var uuid = utils.generateUUID();
    var title = slide.title;
    var text = slide.text;
    var content = {};

    Slide.create(uuid, title, text, content).then(
      function(data){
       $log.info(data)
       $scope.slides[data.id]= data;
       console.log($scope.slides);
      }, function(error){
        $log.warn(error)
      }, function(update) {
        $log.info(update)
      }
    );

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
