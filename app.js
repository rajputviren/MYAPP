var app = angular.module("myApp", ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html'
        }).when('/:menuName', {
            templateUrl: 'templates/main.html',
            controller: 'viewDataController'
        })
        .otherwise({redirectTo: '/'});
}]);

app.controller("myCtrl", function ($scope, $location) {
    $scope.menuNames = [{name: "Sport"}, {name: "Food"}, {name: "Coffee"}, {name: "Shopping"}];
    $scope.data = {model: null};

    $scope.update = function () {
        $scope.data = [];
        $scope.data.push(angular.element('#Search').val());
        $scope.data.push(angular.element('#city').val());

        if ($scope.data[0] != "" && $scope.data[1] != "") {
            $location.path('/' + $scope.data);
        }
    }
});


