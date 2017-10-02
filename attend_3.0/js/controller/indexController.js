var app = angular.module('todoapp',["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "view/mainView.html",
    })
    .when("/london", {
        templateUrl : "view/mainView.html",
    })
    .when("/paris", {
        templateUrl : "view/mainView.html",
    });
});