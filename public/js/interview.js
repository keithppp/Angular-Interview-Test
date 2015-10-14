'use strict';
angular.module('Interview', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
      .state('main', {
        abstract: true,
        url: '/',
        template: '<ui-view/>'
      })
      .state('main.frontpage', {
        url: '',
        templateUrl: '/render/frontpage/instructions'
      })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
    $urlRouterProvider.otherwise('/');
  })