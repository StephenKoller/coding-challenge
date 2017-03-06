angular.module('grapeviin')
.controller('HomeController', function ($stateParams, LinkService) {
  var vm = this;
  vm.LinkService = LinkService;

  // UI State Variables for Sorting Data Table
  vm.sortOptions = {
    sortType: 'clicks',
    sortReverse: true
  }

  // Controller Init
  vm.init = function() {
    vm.LinkService.getLinks();

    var _sortOptions = localStorage.getItem('sortOptions');
    if(_sortOptions === null || _sortOptions === '') {
      localStorage.setItem('sortOptions', JSON.stringify(vm.sortOptions));
    } else {
      vm.sortOptions = JSON.parse(_sortOptions);
    }
  };

  vm.setSortOptions = function (sortOptions) {
    vm.sortOptions = sortOptions;
    localStorage.setItem('sortOptions', JSON.stringify({sortType: vm.sortType, sortReverse: vm.sortReverse}));
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
    // check if text has changed before calling service
    if(link.text !== text) {
      vm.LinkService.saveLink(link, text);
    }
  };
  // end CRUD Operations

  vm.init();
});