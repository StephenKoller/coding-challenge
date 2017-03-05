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