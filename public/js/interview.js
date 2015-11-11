'use strict';
var baseUrl = '/Angular-Interview-Test/public/';

var Interview = angular.module('Interview', ['ui.router']);

/*Interview.controller('MyCtrl', function($state) {
  $state.go('home');
  $state.go('home.nav');
});*/

Interview.config(function($stateProvider, $urlRouterProvider, $locationProvider){
     $urlRouterProvider.otherwise(baseUrl);
     $stateProvider
    .state('home', {
        abstruct: true,
        url: baseUrl,
        views: {

            // the main template will be placed here 
            '': { 
                templateUrl: baseUrl+'/templates/body.html',
                controller: 'body'
            },

            // the child navigation view will be defined here 
            'navigation': { 
                templateUrl: baseUrl+'templates/partials/nav.html',
                controller: 'nav'
            },

            // the child footer view will be defined here
            'footer': { 
                templateUrl: baseUrl+'templates/partials/footer.html',
                controller: 'footer'
            }
        }
    })

    
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
    
});

