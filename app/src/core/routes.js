/* global angular */

// everything with bx is "inside" === authed. the rest is not.

(function() {
  'use strict';

  angular.module('bidos')

  .config(['$stateProvider', function($stateProvider) {

    $stateProvider

    // main route for anything bxenticated
      .state('bx', {
      url: '',
      templateUrl: 'templates/layout.html'
    })

    // kind of a dashboard
    .state('bx.home', {
      url: '/home',
      views: {
        main: {
          template: '<bx-dashboard layout flex></bx-dashboard>'
        }
      }
    })

    .state('bx.capture', {
      url: '/capture',
      views: {
        main: {
          template: '<bx-capture layout="row" flex></bx-capture>'
        }
      }
    })

    .state('bx.capture.go', {
      url: '/:type',
      views: {
        'capture-main': {
          template: function(stateParams) {
            if (_.isEmpty(stateParams)) {
              stateParams.type = 'kid';
            }
            return '<bx-capture layout="row" flex type="' + stateParams.type + '"></bx-capture>';
          }
        }
      }
    })

    .state('bx.table', {
      url: '/resource/:type',
      views: {
        main: {
          template: function(stateParams) {
            return '<bx-table layout flex type="' + stateParams.type + '"></bx-table>';
          }
        }
      }
    })

    .state('bx.portfolio', {
      url: '/portfolio',
      views: {
        main: {
          template: '<bx-portfolio flex></bx-portfolio>'
        }
      }
    })

    .state('bx.user-profile', {
      url: '/profile',
      views: {
        main: {
          template: '<bx-profile></bx-profile>'
        }
      }
    })

    .state('bx.user-preferences', {
      url: '/prefs',
      views: {
        main: {
          template: '<bx-user-preferences></bx-user-preferences>'
        }
      }
    })

    .state('bx.observation-inbox', {
      url: '/observation-inbox',
      views: {
        main: {
          template: '<bx-observation-inbox></bx-observation-inbox>'
        }
      }
    })

    ;

  }]);
}());
