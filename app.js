
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

.service('uniqueArray', function() {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    return function(array) {
        return array.filter( onlyUnique );
    }
})

.controller('MainCtrl', function(loadBooks, uniqueArray) {

    function getUniqueTags() {
        var tags = [];
        angular.forEach(self.books, function(book) {
            tags = tags.concat(book.tags);
        });
        return uniqueArray(tags);
    }

    this.name = 'world';

    this.books = [];

    var self = this;
    loadBooks().then(function(books) {
        self.books = books;
        self.tags = getUniqueTags();
        self.tags.sort();
    });

});
