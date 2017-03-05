angular.module('grapeviin')
.controller('HomeController', function ($stateParams, LinkService) {
  var vm = this;
  vm.LinkService = LinkService;

  // UI State Variables for Sorting Data Table
  vm.sortType = 'clicks';
  vm.sortReverse = true;

  // Controller Init
  vm.init = function() {
    vm.LinkService.getLinks();
  };

  // CRUD Operations - for a slim controller, pass calls to service layer
  vm.addLink = function(text) {
    vm.LinkService.addLink(text);
  };

  vm.removeLink = function(link) {
    vm.LinkService.removeLink(link);
  };

  vm.editLink = function(link) {
    vm.LinkService.editLink(link);
  };

  vm.saveLink = function(link, text) {
    vm.LinkService.saveLink(link, text);
  };
  // end CRUD Operations

  vm.init();
});