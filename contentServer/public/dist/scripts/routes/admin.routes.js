"use strict";

angular.module('adminApp').config(function($routeProvider) {
  $routeProvider.when('/home', {
    controller: 'eventsController',
    controllerAs: 'controller',
    templateUrl: '/admin/home.html'
  }).when('/edit/:uuid', {
    controller: 'eventsController',
    controllerAs: 'controller',
    templateUrl: '/admin/edit.html'
  }).when('/play/:uuid', {
    controller: 'playerController',
    templateUrl: '/admin/player.html'
  })
  .otherwise({ redirectTo: '/home'});
});
