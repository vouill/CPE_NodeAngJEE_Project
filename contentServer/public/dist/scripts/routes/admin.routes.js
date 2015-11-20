"use strict";

angular.module('adminApp').config(function($routeProvider) {
  $routeProvider.when('/create', {
    controller: 'eventsController',
    templateUrl: '/admin/createPresentation.html'
  }).when('/edit/:uuid', {
    controller: 'eventsController',
    templateUrl: '/admin/editPresentation.html'
  })
  .otherwise({ redirectTo: '/create'});
});
