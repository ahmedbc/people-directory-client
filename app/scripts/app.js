'use strict';

/**
 * @ngdoc overview
 * @name peopleDirectoryClientApp
 * @description
 * # peopleDirectoryClientApp
 *
 * Main module of the application.
 */
angular
  .module('peopleDirectoryClientApp', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ngDialog'
  ])
    .constant('urls', {
       BASE_API: 'http://localhost:8080/api'
     })
      .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
          })
          .when('/peopleDirectory', {
            templateUrl: 'views/peopleDirectory.html',
            controller: 'PeopleDirectoryCtrl',
            controllerAs: 'peopleDirectory'
          })
          .when('/jobManager', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
          })
          .when('/statistics', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
          }).
           when('/signIn', {
               templateUrl: 'views/signIn.html',
               controller: 'SignInCtrl',
               controllerAs: 'signIn'
           }).
            when('/logOut', {
                controller: 'LogOutCtrl',
                controllerAs: 'logOut'
            })
          .otherwise({
            redirectTo: '/'
          });

          $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
           return {
               'request': function (config) {
                   config.headers = config.headers || {};
                   if ($localStorage.token) {
                       config.headers['X-Auth-Token'] = $localStorage.token;
                   }
                   return config;
               },
               'responseError': function (response) {
                   if (response.status === 401 || response.status === 403) {
                       $location.path('/signIn');
                   }
                   return $q.reject(response);
               }
           };
        }]);
      }]).run(function($rootScope, AuthServices) {
        $rootScope.logout = function() {
          AuthServices.logout(function () {
            window.location = "/"
          });
        };
    });
