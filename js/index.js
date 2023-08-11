var app = angular.module("myapp", []);
app.controller("productCtrl", function($scope) {


});
app.controller("productCtrl", function($scope, $http) {
    $http.get('/js/products.json').then(function(response) {
        $scope.products = response.data;
    });
})