/*
 * Grapeviin - Angular 1.6
 */
angular
  .module('grapeviin', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/pages/home/home.view.html',
        controller: 'HomeController as vm'
      })
      .when('/landing/:link', {
        templateUrl: 'app/pages/landing/landing.view.html',
        controller: 'LandingController as vm'
      })
      .when('/:link', {
        redirectTo: function(route, path, search) {
          return "/landing/" + route.link;
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function() {
      console.log("Ready to link!");
  });