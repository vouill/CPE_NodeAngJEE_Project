var controller = angular.module('adminApp').controller('eventsController',
function($scope, $log, $routeParams, auth, Content, Slide, Presentation, utils) {

  $scope.dropped = {};
  $scope.contents = {};
  $scope.slides = {}
  $scope.slide = Slide.model;

  $scope.content = {
    id:'',
    title: '',
    fileName: '',
    type: ''
  }

// choose between Presentations and Content (create or edit)
  var uuid = $routeParams.uuid;

  if(!uuid) {
    Presentation.all().then(function (presentations) {
      $scope.presentations = presentations;
    }, function(error) {

    }, function(info) {

    });
  } else {
      Content.all().then(function(contents) {
        $scope.contents = contents;
        Presentation.single($routeParams.uuid).then(
          function(presentation) {
            $scope.slides = Slide.all(presentation, contents);
          },
          function(error) {
            $log.warn('error : '+ error);
          }
        );
      }, function(error) {
        $log.warn('error : '+ error);
      });
  }


  $scope.addContent = function() {
    console.log("coucou")
  }

  $scope.edit = function(id) {
    console.dir($scope.slides);
    if(id) {
      // edit
      var current = $scope.slides[id];
      $scope.slide = current;
    } else {
      // create
      var id = utils.generateUUID();
      var slide = Slide.model();
      console.log('model:');
      console.dir(Slide.model());
      slide.id = id;
      $scope.slide = slide;
      console.dir($scope.slide)
      $scope.slides[id]= slide;
    }
  };

  $scope.createContent = function() {
    var file = $scope.file;
    Content.create(file)

  }
  $scope.onDropComplete= function(content, event) {
    $scope.slide.content = content;
  };

}).$inject = ['$scope', '$log', '$routeParams', 'auth', 'Content', 'Slide', 'Presentation', 'utils'];
