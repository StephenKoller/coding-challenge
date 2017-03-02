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

  vm.addLink = function(text) {
    vm.links.push({
      text: text,
      clicks: 0,
      editing: false,
    });
  };

  vm.removeLink = function(index) {
    if (index > -1) {
      vm.links.splice(index, 1);
    }
  };

  vm.editLink = function(index) {
    vm.links[index].editing = true;
  };

  vm.saveLink = function(index, text) {
    vm.links[index].editing = false;
    vm.links[index].text = text;
  };
});