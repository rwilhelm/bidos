/* global angular */

(function() {
  'use strict';

  angular.module('bidos')
    .service('CRUD', CRUDService);

  function CRUDService($http, $q, Help) {

    /* Basic CRUD operations doing HTTP calls to the back end. */

    var config = require('../../config');

    return {
      get: getResources,
      create: createResource,
      update: updateResource,
      destroy: destroyResource
    };

    function getResources() {
      console.time('CRUD get');
      var url = [config.app.API, config.app.RESOURCE_PATH, config.app.DEFAULT_RESOURCE].join('/');
      return $q(function(resolve, reject) {
        $http.get(url)
          .success(function(response) {
            resolve(response);
            console.log(response);
          })
          .error(function(err) {
            reject(err);
            console.warn('CRUD GET: ', err);
          });
      });
    }

    function createResource(resource) {
      var url = [config.app.API, config.app.RESOURCE_PATH, resource.type].join('/');
      return $q(function(resolve, reject) {
        $http.post(url, resource)
          .success(function(response) {
            resolve(response);
            Help.log('create resource: ' + response[0].type, response);
          })
          .error(function(err) {
            reject(err);
            Help.warn('create resource: ' + err);
          });
      });
    }

    function updateResource(resource) {
      var url = [config.app.API, config.app.RESOURCE_PATH, resource.type, resource.id].join('/');
      return $q(function(resolve, reject) {
        $http.patch(url, resource)
          .success(function(response) {
            resolve(response);
            Help.log('update resource: ' + response[0].type, response);
          })
          .error(function(err) {
            reject(err);
            Help.warn('update resource: ' + err);
          });
      });
    }

    function destroyResource(resource) {
      var url = [config.app.API, config.app.RESOURCE_PATH, resource.type, resource.id].join('/');
      return $q(function(resolve, reject) {
        $http.delete(url)
          .success(function(response) {
            resolve(response);
            Help.log('destroy resource: ' + response[0].type, response);
          })
          .error(function(err) {
            reject(err);
            Help.warn('destroy resource: ' + err);
          });
      });
    }
  }

}());