(function () {
    'use strict';

    angular
        .module('thinkster.layout.controllers')
        .controller('IndexController', IndexController);

        IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

    function IndexController($scope, Authentication, Posts, Snackbar) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.posts = [];

        activate();

        function activate() {
            Posts.all().then(postSuccessFn, postErrorFn);

            //when someone creates a new post, we don't have to grab all of the new data instead can mimic that posts and
            //add it to the front of the array not at the bottom
            $scope.$on('post.created', function (event, post) {
                vm.posts.unshift(post);
            });

            $scope.$on('post.created.error', function () {
                vm.posts.shift();
            });

            function postSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }

            function postErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();