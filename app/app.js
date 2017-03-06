/*
 * Grapeviin - Angular 1.6
 */
angular
  .module('grapeviin', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
      // if no route  provided, default to root URI
      $urlRouterProvider.otherwise('/');

      // setup base route
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/pages/home/home.view.html',
          controller: 'HomeController as vm'
        })
        
        // landing page route
        .state('landing', {
          url: '/landing/?link=',
          templateUrl: 'app/pages/landing/landing.view.html',
          controller: 'LandingController as vm'
        });

  })

  .run(function() {
      console.log("Ready to drink!");
  });