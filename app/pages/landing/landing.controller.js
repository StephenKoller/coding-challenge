angular.module('grapeviin')
.controller('LandingController', function ($routeParams, $location, LinkService) {
    var vm = this;

    vm.link = {
        text: '',
        clicks: 0,
    }
    vm.LinkService = LinkService;

    vm.init = function() {
        // check if route is referring to a non-existent link
        if($routeParams.link !== null) {
            vm.link = vm.LinkService.getLinkByText($routeParams.link);
            vm.LinkService.incrementLink(vm.link);
        }

        if(vm.link === undefined) {
            $location.path('/').replace();
        }
    };

    vm.init();
});