angular.module('grapeviin')
.controller('LandingController', function ($stateParams, LinkService) {
    var vm = this;

    vm.link = {
        text: '',
        clicks: 0,
    }
    vm.LinkService = LinkService;

    vm.init = function() {
        vm.link = vm.LinkService.getLinkByText($stateParams.link);
        vm.LinkService.incrementLink(vm.link);
    };

    vm.init();
});