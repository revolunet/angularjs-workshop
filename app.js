
angular.module('DemoApp', [])

.service('loadBooks', function($http, randomizeArray) {
    return function() {
        return $http.get('./books.json').then(function(response) {
            return randomizeArray(response.data.books);
        });
    };
})

// from https://github.com/coolaj86/knuth-shuffle/blob/master/index.js
.service('randomizeArray', function() {

    function randOrd(){
      return (Math.round(Math.random())-0.5);
    }

    return function(array) {
        return array.sort(randOrd);
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
