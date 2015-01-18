'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'discogs.collection',
  'discogs.users',
  'discogs.release',
  'discogs.marketplace'
]).config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'partials/home',
      controller: 'MyCtrl1'
    }).
    when('/collection', {
      templateUrl: 'partials/collection',
      controller: 'collectionCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
