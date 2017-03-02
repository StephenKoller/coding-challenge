angular.module('grapeviin')
.controller('HomeController', function ($stateParams) {
  var vm = this;

  vm.links = [
    {
      text: 'foo',
      clicks: 0,
    },
    {
      text: 'bar',
      clicks: 1,
    }
  ];

  vm.addLink = function(text) {
    vm.links.push({
      text: text,
      clicks: 0
    });
  };
});