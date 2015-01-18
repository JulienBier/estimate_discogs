'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    /*$http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });*/

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('collectionCtrl', ['$scope', '$routeParams', 'collection', 'users', 'release', 'marketplace', function ($scope, $routeParams, collection, users, release, marketplace) {
    $scope.releases = [];
    users.get({userid: $routeParams.user}, function (res) {
      $scope.username = res.name || res.username;
      $scope.avatarUrl = res.avatar_url;
    });
    collection.get({userid: $routeParams.user}, function (res) {
      var _releases = res.releases;
      var release = _releases.pop();
      getRelease(release.id).then(function (release) {
        $scope.releases.push(release);
        console.log(release);
      });
      
      getPrices(release.id).then(function (prices) {
        console.log(prices);
      });
      
      /*res.releases.forEach(function (obj) {
        release.get({releaseid: obj.id}, function (rr) {
          _releases.push(rr);
        });
      });*/
      //$scope.releases = _releases;
    });
    
    function getRelease(releaseId) {
      return release.get({releaseid: releaseId}).$promise;
    }
    
    function getPrices(releaseId) {
      return marketplace.get({releaseid: releaseId}).$promise;
    }
  }]);
