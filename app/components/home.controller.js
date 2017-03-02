angular.module('grapeviin')
.controller('HomeController', function ($stateParams) {
  var vm = this;

  vm.list = [
    {
      text: 'foo',
      clicks: 0,
    },
    {
      text: 'bar',
      clicks: 1,
    }
  ];
  console.log("home init");
});