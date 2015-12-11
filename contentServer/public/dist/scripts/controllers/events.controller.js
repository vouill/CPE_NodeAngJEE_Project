var controller = angular.module('adminApp').controller('eventsController',
function($scope, $log, $routeParams, $window, auth, Content, Slide, Presentation, utils) {

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

  // choose between Presentations and Content (/#/home or /#/edit behaviors)
  var uuid = $routeParams.uuid;

  if(!uuid) {
    // /#/home behavior
    Presentation.all().then(function (presentations) {
      $scope.presentations = presentations;
    }, function(error) {

    }, function(info) {

    });
  } else {

      // /#/edit behavior
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

  $scope.watch = function() {
    $window.open("/admin/#/play/"+uuid, "_self");
  }

  //edit a slide or create a new one if no id were given
  $scope.edit = function(id) {
    if(id) {
      // edit
      var current = $scope.slides[id];
      $scope.slide = current;
    } else {
      // create
      var id = utils.generateUUID();
      var slide = Slide.model();
      slide.id = id;
      $scope.slide = slide;
      $scope.slides[id]= slide;
    }
  };

  // create a presentation
  $scope.create = function(title, description) {

      var presentation = {};
      presentation.title = title;
      presentation.description = description;
      presentation.id = utils.generateUUID();
      presentation.slidArray = [];

      // automatically save an empty presenation
      Presentation.save(presentation).then(
        function(response) {
          Presentation.all().then(function (presentations) {
            $scope.presentations = presentations;
          }, function(error) {

          }, function(info) {

          });
        },
        function(error) {},
        function(update){}
      )
  }

  //triggers the file upload, when the file is uploaded, reload the Contents and the Slides
  $scope.upload = function() {
    var file = $scope.file;
    Content.create(file).then( function(response) {
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
    }, function(error) {}, function(update) {})
  }

  //Triggers the presentation save method
  $scope.save = function() {
    if(uuid) {
      Presentation.single($routeParams.uuid).then(
        function(presentation) {
          presentation.slidArray = $scope.slides;
          Presentation.save(presentation);
        },
        function(error) {
          $log.warn('error : '+ error);
        }
      );
  } else {
    console.log('no uuid');
  }

  }

  $scope.onDropComplete= function(content, event) {
    $scope.slide.content = content;
  };

}).$inject = ['$scope', '$log', '$routeParams', '$window','auth', 'Content', 'Slide', 'Presentation', 'utils'];
