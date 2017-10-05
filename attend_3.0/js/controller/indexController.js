var ampApp = angular.module('ampApp',['ngRoute']);

ampApp.controller('LoginCtrl', ['$scope', function ($scope) {

    $scope.text = 'Hello, Angular fanatic.';

}]);

ampApp.controller('MainCtrl', ['$scope', function ($scope) {

    $scope.text1 = 'Hello, Angular fanatic.';

}]);

ampApp.controller('SettingCtrl', ['$scope', function ($scope) {

    $scope.text2 = 'Hello, Angular fanatic.';

}]);

ampApp.config(['$routeProvider', function ($routeProvider) {

  /**
   * $routeProvider
   */
  $routeProvider
  .when('/', {
    templateUrl: 'view/loginView.html',
    controller: 'LoginCtrl'
  })
  .when('/login', {
    templateUrl: 'view/loginView.html',
      controller: 'LoginCtrl'
  })
    .when('/main', {
    templateUrl: 'view/mainView.html',
      controller: 'MainCtrl'
  })
    .when('/setting ', {
    templateUrl: 'view/settingView.html',
      controller: 'SettingCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });

}]);

ampApp.directive('customButton', function () {
  return {
    link: function (scope, element, attrs) {
      // DOM 조작과 이벤트 설정은 여기서!
    }
  };
});

ampApp.service('commom', function(){
    this.plus = function (x, y){
        return x+y;
    };
});

//myApp.factory('Server', ['$http', function ($http) {
//  return {
//    get: function(url) {
//      return $http.get(url);
//    },
//    post: function(url) {
//      return $http.post(url);
//    },
//  };
//}]);

ampApp.filter('reverse', function () {
    return function (input, uppercase) {
        var out = '';
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    }
});