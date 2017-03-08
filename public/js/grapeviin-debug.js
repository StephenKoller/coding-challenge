/*
 * Grapeviin - Angular 1.6
 */
angular
  .module('grapeviin', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'html/home/home.view.html',
        controller: 'HomeController as vm'
      })
      .when('/landing/:link', {
        templateUrl: 'html/landing/landing.view.html',
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
angular.module('grapeviin')
.service('LinkService', function() {
	var service = {
    links: []
	};

  // Get all
  service.getLinks = function() {
    var _links = localStorage.getItem('links');
    if(_links != null) {
      service.links = JSON.parse(_links);
    }
  };

  // Get one
  service.getLinkByText = function(text) {
    return service.links.find(function(link) { return link.text === text });
  };

  // Create
  service.addLink = function(text) {
    service.links.push({
      text: text,
      clicks: 0,
    });

    _storeLinks();
  };

  // Turn on editing
  service.editLink = function(link) {
    var index = service.links.indexOf(link);

    if (index > -1) {
      // if an editor is already open, then close it before opening a new one
      service.links.forEach(function(l) {
        l.editing = false;
      });

      // turn on editing for the given link
      service.links[index].editing = true;
    }
  };

  // Update
  service.saveLink = function(link, text) {
    var index = service.links.indexOf(link);

    service.links[index].editing = false;
    service.links[index].text = text;

    _storeLinks();
  }

  // Delete
  service.removeLink = function(link) {
    var index = service.links.indexOf(link);

    if (index > -1) {
      service.links.splice(index, 1);
    }

    _storeLinks();
  };

  // Update: Add to view / click counter
  service.incrementLink = function(link) {
    var index = service.links.indexOf(link);

    service.links[index].clicks += 1;

    _storeLinks();
  };

  // Local helper method to store links array
  var _storeLinks = function() {
    localStorage.setItem('links', JSON.stringify(service.links));
  };
  
  service.getLinks();
  return service;
});
angular.module('grapeviin')
.service('SortService', function() {
  // supply a default
  var service = {
    options: {
      type: 'clicks',
      reverse: false
    }
	};

  // Read
  service.getOptions = function () {
    var _options = localStorage.getItem('sortOptions');
    if(_options != null) {
      service.options = JSON.parse(_options);
    }
  };

  // Update
  service.setOptions = function (sortOptions) {
    service.options = sortOptions;
    localStorage.setItem('sortOptions', JSON.stringify(service.options));
  }

  return service;
});
angular.module('grapeviin')
.controller('HomeController', function ($scope, $routeParams, LinkService, SortService) {
  var vm = this;
  vm.LinkService = LinkService;
  vm.SortService = SortService;

  // UI State Variables for Sorting Data Table
  vm.sortOptions = {};

  // Controller Init
  vm.init = function() {
    vm.LinkService.getLinks();
    vm.SortService.getOptions();
  };

  // CRUD Operations - for a slim controller, pass calls to service layer
  vm.addLink = function(text) {
      vm.LinkService.addLink(text);
  };

  vm.editLink = function(link) {
    vm.LinkService.editLink(link);
  };

  vm.saveLink = function(link, text) {
    // check if text has changed before calling service
    if(link.text !== text) {
      vm.LinkService.saveLink(link, text);
    }
  };
  
  vm.removeLink = function(link) {
    vm.LinkService.removeLink(link);
  };

  // Update the sorting options
  vm.setSortOptions = function (sortOptions) {
    vm.sortOptions = sortOptions;
    vm.SortService.setOptions(sortOptions);
  };

  vm.init();
});
angular.module('grapeviin')
.controller('LandingController', function ($routeParams, $location, LinkService) {
    var vm = this;

    vm.link = {
        text: '',
        clicks: 0,
    }
    vm.LinkService = LinkService;

    vm.init = function() {
        // check if route is referring to a non-existent link
        if($routeParams.link !== null) {
            vm.link = vm.LinkService.getLinkByText($routeParams.link);
            vm.LinkService.incrementLink(vm.link);
        }

        if(vm.link === undefined) {
            $location.path('/').replace();
        }
    };

    vm.init();
});