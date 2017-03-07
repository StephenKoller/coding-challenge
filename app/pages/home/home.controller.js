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