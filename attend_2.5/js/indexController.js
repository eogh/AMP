var ampApp = angular.module('ampApp', []);

ampApp.controller('ampCtrl', function ($scope, $timeout) {

    //defined
    $scope.text = 'Hello, Angular fanatic.';
    $scope._screen = "coldStart";

    $scope.onload = function () {
        //init : 앱이 실행됬을 때 최초로 실행되는 부분
        $scope.text = 'Hello, Angular fanatic111.';

        $scope.showScreen("coldStart");
        $timeout(function () {
            $scope.showScreen("mainView");
        }, 1000);
    }

    $scope.showScreen = function (screen) {
        console.log("showScreen : " + screen);
        $scope._screen = screen;
        $scope.$evalAsync(); //timeout 시에는 강제로 갱신필요
    }
});









/***********************************************************************************/
/******************************나중에 사용 할 것들*************************************/
/***********************************************************************************/

ampApp.directive('customButton', function () {
    return {
        link: function (scope, element, attrs) {
            // DOM 조작과 이벤트 설정은 여기서!
        }
    };
});

ampApp.service('commom', function () {
    this.plus = function (x, y) {
        return x + y;
    };
});

ampApp.factory('Server', ['$http', function ($http) {
    return {
        get: function (url) {
            return $http.get(url);
        },
        post: function (url) {
            return $http.post(url);
        },
    };
}]);

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