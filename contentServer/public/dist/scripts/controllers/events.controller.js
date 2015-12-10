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

//TODO choose between Presentations and Content.

  Presentations.all().then(function (presentations) {
    console.log("coucou");
  }, function(error) {

  }, function(info) {

  });

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

  $scope.addContent = function() {

  }

  $scope.edit = function(id) {
    if(id) {
      // edit
      var current = $scope.slides[id];
      $scope.slide = current;
    } else {
      // create
      var id = utils.generateUUID();
      var slide = Slide.model ;
      slide.id = id;
      $scope.slide = slide;
      $scope.slides[id]= slide;
    }
  };

  $scope.createContent = function(data) {
    console.log(data);
    var file = $scope.file;
    file.name = data.title;

    console.log('file is ');
    console.dir(file);
  }
  $scope.onDropComplete= function(content, event) {
    $scope.slide.content = content;
  };

}).$inject = ['$scope', '$log', '$routeParams', 'auth', 'Content', 'Slide', 'Presentation', 'utils'];
