var controller = angular.module('adminApp').controller('eventsController',
function($scope, $log, $routeParams, auth, Content, Slide, Presentation, utils) {
  Slide.all().then(function(response) {
    console.log(response.data)
  });

}).$inject = ['$scope', '$log', '$routeParams', 'auth', 'Content', 'Slide', 'Presentation', 'utils'];
