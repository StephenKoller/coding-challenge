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
          templateUrl: 'html/home/home/home.view.html',
          controller: 'HomeController as vm'
        })
        // landing page route
        .state('landing', {
          url: '/landing/?link=',
          templateUrl: 'html/home/landing/landing.view.html',
          controller: 'LandingController as vm'
        });
  })

  .run(function() {
      console.log("Ready to drink!");
  });
angular.module('grapeviin')
.controller('HomeController', function ($stateParams, LinkService) {
  var vm = this;

  vm.LinkService = LinkService;
  vm.sortType = 'clicks';
  vm.sortReverse = true;

  vm.init = function() {
    vm.LinkService.getLinks();
  };

  vm.addLink = function(text) {
    vm.LinkService.addLink(text);
  };

  vm.removeLink = function(index) {
    vm.LinkService.removeLink(index);
  };

  vm.editLink = function(index) {
    vm.LinkService.links[index].editing = true;
  };

  vm.saveLink = function(index, text) {
    vm.LinkService.saveLink(index, text);
  };

  vm.init();
});
angular.module('grapeviin')
.service('LinkService', function() {
	var service = {
    links: [
        {
          text: 'foo',
          clicks: 0,
        },
        {
          text: 'bar',
          clicks: 0,
        }
      ]
	};

  service.getLinks = function() {
    var localLinks = localStorage.getItem('links');
    if(localLinks != null) {
      service.links = JSON.parse(localLinks);
    }
  };

  service.getLinkByText = function(text) {
    return service.links.find(function(link) { return link.text === text });
  };

  service.addLink = function(text) {
    service.links.push({
      text: text,
      clicks: 0,
    });

    service.storeLinks();
  };

  service.saveLink = function(index, text) {
    service.links[index].editing = false;
    service.links[index].text = text;

    service.storeLinks();
  }

  service.removeLink = function(index) {
    if (index > -1) {
      service.links.splice(index, 1);
    }

    service.storeLinks();
  };

  service.storeLinks = function() {
    localStorage.setItem('links', JSON.stringify(service.links));
  };

  service.incrementLink = function(link) {
    var index = service.links.findIndex(function(el) { return el.text === link.text});

    // increment the actual link click counter
    service.links[index].clicks += 1;

    service.storeLinks();
  };

  return service;
});
angular.module('grapeviin')
.controller('LandingController', function ($stateParams, LinkService) {
    var vm = this;

    vm.link = {
        text: '',
        clicks: 0,
    }
    vm.LinkService = LinkService;

    vm.init = function() {
        vm.link = vm.LinkService.getLinkByText($stateParams.link);
        vm.LinkService.incrementLink(vm.link);
    };

    vm.init();
});