/* global angular, navigator, window, document, faker */

(function() {
  'use strict';

  var app = angular.module('bidos', [
    'auth',
    'ngMaterial',
    'ngMessages',
    'ngStorage',
    'ui.router',
    'chart.js',
    // 'ngCordova',
  ]);

  require('./auth');
  require('./bidos-core');

  faker.locale = 'de';

  app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('amber');
  });

  Array.prototype.rotate = (function() {
    // save references to array functions to make lookup faster
    var push = Array.prototype.push;
    var splice = Array.prototype.splice;

    return function(count) {
      var len = this.length >>> 0; // convert to uint
      count = count >> 0; // convert to int

      // convert count to value in range [0, len[
      count = ((count % len) + len) % len;

      // use splice.call() instead of this.splice() to make function generic
      push.apply(this, splice.call(this, 0, count));
      return this;
    };
  })();

  /* Register event listeners to keep track of our network status and make it
  /* available on $rootScope.networkStatus. */

  app.constant('STRINGS', require('./strings'));

  app.config([
    '$compileProvider',
    function($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/);
    }
  ]);

  app.run(function($rootScope) {

    if (navigator.onLine) {
      console.log('%cONLINE', 'color: green; font-size: 1.2em');
    } else {
      console.log('%cOFFLINE', 'color: red; font-size: 1.2em');
    }

    $rootScope.networkStatus = navigator.onLine ? 'online' : 'offline';
    $rootScope.$apply();

    if (window.addEventListener) {

      window.addEventListener('online', function() {
        $rootScope.networkStatus = 'online';
        $rootScope.$apply();
      }, true);

      window.addEventListener('offline', function() {
        $rootScope.networkStatus = 'offline';
        $rootScope.$apply();
      }, true);

    } else {

      document.body.ononline = function() {
        $rootScope.networkStatus = 'online';
        $rootScope.$apply();
      };

      document.body.onoffline = function() {
        $rootScope.networkStatus = 'offline';
        $rootScope.$apply();
      };

    }
  });

  app.config(function($logProvider) {
    $logProvider.debugEnabled(true);
  });

  app.run(function($rootScope, $log) {
    $rootScope.$log = $log;
  });

  app.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $rootScope) {
      return {
        'request': function(config) {
          $rootScope.$broadcast('loading-started');
          return config || $q.when(config);
        },
        'response': function(response) {
          $rootScope.$broadcast('loading-complete');
          return response || $q.when(response);
        }
      };
    });
  });

  app.directive('loadingIndicator', function() {
    return {
      restrict: 'A',
      template: '<md-progress-linear class="md-warn" md-mode="indeterminate"></md-progress-linear>',
      link: function(scope, element, attrs) {
        scope.$on('loading-started', function(e) {
          element.css({
            'display': ''
          });
        });
        scope.$on('loading-complete', function(e) {
          element.css({
            'display': 'none'
          });
        });
      }
    };
  });


}());
