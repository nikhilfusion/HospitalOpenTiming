'use strict';

/**
 * @ngdoc overview
 * @name pstctaskApp
 * @description
 * # pstctaskApp
 *
 * Main module of the application.
 */
angular
  .module('pstctaskApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
