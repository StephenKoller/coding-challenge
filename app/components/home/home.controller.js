angular.module('grapeviin')
.controller('HomeController', function ($stateParams) {
  var vm = this;

  vm.links = [
        {
          text: 'foo',
          clicks: 0,
          editing: false,
        },
        {
          text: 'bar',
          clicks: 1,
          editing: false,
        }
      ];

  vm.init = function() {
    var localLinks = localStorage.getItem('links');
    if(localLinks != null) {
      vm.links = JSON.parse(localLinks);
    }
  };

  vm.addLink = function(text) {
    vm.links.push({
      text: text,
      clicks: 0,
      editing: false,
    });

    vm.updateLocalLinks();
  };

  vm.removeLink = function(index) {
    if (index > -1) {
      vm.links.splice(index, 1);
    }
    vm.updateLocalLinks();
  };

  vm.editLink = function(index) {
    vm.links[index].editing = true;
  };

  vm.saveLink = function(index, text) {
    var link = vm.links[index];
    link.editing = false;
    link.text = text;
    vm.updateLocalLinks();
  };

  vm.updateLocalLinks = function() {
    localStorage.setItem('links', JSON.stringify(vm.links));
  };

  vm.init();
});