'use strict';

/* Services */
angular.module('discogs.collection', ['ngResource']).
  factory('collection', function($resource) {
    return $resource('api/collection/:userid', {}, {
      query: { method: 'GET', params: { userid: '' }, isArray: false }
    });
  });

angular.module('discogs.release', ['ngResource']).
  factory('release', function($resource) {
    return $resource('api/release/:releaseid', {}, {
      query: { method: 'GET', params: { releaseid: '' }, isArray: false }
    });
  });

angular.module('discogs.users', ['ngResource']).
  factory('users', function($resource) {
    return $resource('api/users/:userid', {}, {
      query: { method: 'GET', params: { userid: '' }, isArray: false }
    });
  });

angular.module('discogs.marketplace', ['ngResource']).
  factory('marketplace', function($resource) {
    return $resource('api/marketplace/prices/:releaseid', {}, {
      query: { method: 'GET', params: { releaseid: ''}, isArray: false }
    });
  });

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.0.1');
