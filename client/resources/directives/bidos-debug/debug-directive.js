(function() {
  /* global angular */
  'use strict';

  angular.module('bidos')
    .directive('bidosDebug', [function() {
      return {
        restrict: 'E',
        templateUrl: 'resources/directives/debug-directive.html',
        link: function(scope, element, attributes) {}
      };
    }]);
}());
