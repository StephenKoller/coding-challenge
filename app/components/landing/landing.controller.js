angular.module('grapeviin')
.controller('LandingController', function ($stateParams) {
    var vm = this;

    vm.link = $stateParams.link;
});