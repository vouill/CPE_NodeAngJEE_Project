"use strict";

angular.module('adminApp').config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'eventsController',
    controllerAs: 'controller',
    templateUrl: '/admin/home.html'
  }).when('/edit/:uuid', {
    controller: 'eventsController',
    controllerAs: 'controller',
    templateUrl: '/admin/edit.html'
  }).when('/play/:uuid', {
    controller: 'playerController',
    controllerAs: 'ctrl',
    templateUrl: '/admin/player.html'
  })
  .otherwise({ redirectTo: '/create'});
});
