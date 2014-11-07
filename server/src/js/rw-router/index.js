(function() {
  'use strict';

  require('../rw-auth');

  angular.module('rw.router', ['ui.router', 'rw.auth'])

  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider

      .state('index', {
        url: "/",
        template: '<react-component name="Index" props="vm">'
      })

      .state('login', {
        url: "/login",
        template: '<react-component name="Login" props="vm">'
      })

      .state('signup', {
        url: "/signup",
        template: '<react-component name="Signup" props="vm">'
      })

      .state('admin', {
        url: "/admin",
        template: '<div />'
      })

      .state('admin.users', {
        url: "/admin/users",
        template: '<react-component name="Users" props="vm">',
        controller: 'adminCtrl'
      });

  }]);

}());
