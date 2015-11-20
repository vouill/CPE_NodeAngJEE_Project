
var controller = angular.module('adminApp').controller('presentationController',
function($scope, $log, $routeParams, auth, Content, Slide, Presentation, utils) {

  Presentation.all().then(function(response) {
    $scope.presentations = response.data;
  }, function(error) {
    $log.error(error);
  }, function(update) {
    $log.info(update);
  });

  $scope.presentation = {
    title: '',
    description: ''
  };

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
       $scope.slides = data;
       console.log($scope.slides);
      }, function(error){
        $log.warn(error)
      }, function(update) {
        $log.info(update)
      }
    );
  }
}).$inject = ['$scope', '$log', '$routeParams', 'auth', 'Content', 'Slide', 'Presentation', 'utils']
