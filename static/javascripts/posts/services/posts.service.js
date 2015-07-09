(function () {
    'use strict';
    //this module is going to take data from backend and display on client
    angular
        .module('thinkster.posts.services')
        .factory('Posts', Posts);

    Posts.$inject = ['$http'];

    function Posts($http) {
        var Posts = {
            all: all,
            create: create,
            get: get
        };

        return Posts;

        //is going to retreive all posts from backend
        function all() {
            return $http.get('/api/v1/posts/');
        }

        //is going to create new posts on backend
        function create(content) {
            return $http.post('/api/v1/posts/', {
                content: content
            });
        }

        //is going to retreive posts by username
        function get(username) {
            return $http.get('/api/v1/accounts/' + username + '/posts/');
        }
    }
})();