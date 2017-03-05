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

  vm.removeLink = function(link) {
    vm.LinkService.removeLink(link);
  };

  vm.editLink = function(link) {
    vm.LinkService.editLink(link);
  };

  vm.saveLink = function(link, text) {
    vm.LinkService.saveLink(link, text);
  };

  vm.init();
});