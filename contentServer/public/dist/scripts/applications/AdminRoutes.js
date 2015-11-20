"use strict";

angular.module('adminApp').config(function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: '/admin/createPresentation.html'
  }).when('/edit/:uuid', {
    controller: 'eventController',
    templateUrl: '/admin/editPresentation.html'
  })
  .otherwise({ redirectTo: '/create'});
});
