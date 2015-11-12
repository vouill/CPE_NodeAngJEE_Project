angular.module('adminApp', ['authService', 'utilsService','slideFactory', 'contentFactory', 'presentationFactory', 'ngRoute']);

angular.module('adminApp').config(function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: '/admin/createPresentation.html'
  }).otherwise({ redirectTo: '/create'});
});
