/* global angular, _ */

(function() {
  'use strict';

  angular.module('bidos')
    .service('ResourceHelper', ResourceHelper);

  function ResourceHelper(ResourceService) {

    var resources = null; // datamodel

    if (!resources) {
      ResourceService.get().then(function(data) {
        resources = data;
      });
    }

    return {
      countKids: countKids,
      groupName: groupName
    };

    function countKids(groupId) {
      return _.select(resources.kids, {
        group_id: +groupId
      }).length;
    }


    function groupName(groupId) {
      return _.select(resources.groups, {
        id: +groupId
      })[0].name;
    }

  }
}());