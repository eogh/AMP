var ampApp = angular.module('ampApp', []);

ampApp.controller('ampCtrl', function ($scope, $timeout, $http) {

    //******************** common Function ********************//
    
    $scope.text = 'Hello, Angular fanatic.';
    $scope._screen = "coldStart"; //default :: coldStart

    $scope._dateList = []; //날짜목록
    $scope._peopleList = []; //인원목록
    $scope._setAttend; //임시로 만듬
    
    
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
        
        switch(screen) {
            case 'loadView' :
                $scope.getAttendDateList();
                break;
            case 'checkView' :
                $scope.getPeople();
                break;
            case 'mainView' :
                
                break;
            case 'statisticsView' :
                
                break;
            case 'managerView' :
                $scope.setAttend();
                break;
            default : 
                break;
        }
        $scope.$evalAsync(); //timeout 시에는 강제로 갱신필요
    }
    
    
    //******************** AJAX Function ********************//
    
    $scope.getAttendDateList = function() { //1.날짜목록을 가져온다. Group By
        $http({
            method: 'POST',
            url: 'ajax/GET_attendDateList.php',
            data: 3,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            $scope._dateList = res;
            console.log("getAttendDateList :: _dateList = "+JSON.stringify($scope._dateList));
        }).error(function(e){
            
        });
    }
    
    $scope.getAttendByDate = function() { //2.날짜에 해당하는 출석을 가져온다. 
        
    }
    
    $scope.setAttend = function() { //3.출석을 저장한다. create/update
        $http({
            method: 'POST',
            url: 'ajax/SET_attend.php',
            data: $scope._peopleList,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            console.log("setAttend :: "+JSON.stringify(res));
            console.log("setAttend :: "+res);
            console.log("저장되었습니다.");
            $scope._setAttend = res;
        }).error(function(e){
            console.log("실패하였습니다.");
        });
    }
    
    $scope.getPeople = function() { //모든 인원정보를 가져온다.
        $http({
            method: 'POST',
            url: 'ajax/GET_peopleData.php',
            data: '모두공동체',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            $scope._peopleList = res;
            console.log("getPeople :: _peopleList = "+JSON.stringify($scope._peopleList));
        }).error(function(e){
            
        });
    }
    
    $scope.getPerson = function() { //인원 한명에 정보를 가져온다.
        //추후작업
    }
    
    $scope.setPerson = function() { //인원 한명의 정보를 추가/변경한다.
        //추후작업
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