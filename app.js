
angular.module('DemoApp', [])

.service('loadBooks', function($http) {
    return function() {
        return $http.get('./books.json').then(function(response) {
            return response.data.books;
        });
    };
})

.controller('MainCtrl', function(loadBooks) {
    this.name = 'world';

    this.books = [];

    var self = this;
    loadBooks().then(function(books) {
        self.books = books;
    });

});
