/*
*'angular.filter' -> ng-repeat key/value 를 하기 위해 필요한 값
*
*/
var ampApp = angular.module('ampApp', ['angular.filter']);

ampApp.controller('ampCtrl', function ($scope, $timeout, $http) {

    //******************** common Function ********************//
    
    $scope.nowDate = Date.now();
    $scope._screen = "coldStart"; //default :: coldStart
	
	$scope._loginInfo = "";
    $scope._checkFlag = false; //false:예배, true:모임
    $scope._checkText = "예배";
    $scope._checkViewTitle = "";
	
	$scope.count11 = 0;
	$scope.count12 = 0;
	$scope.count21 = 0;
	$scope.count22 = 0;
	
    $scope._dateList = []; //날짜목록
    $scope._peopleList = []; //인원목록
    
    
    $scope.onload = function () {
        //init : 앱이 실행됬을 때 최초로 실행되는 부분
        $scope.showScreen("coldStart");
        $timeout(function () {
            $scope.showScreen("loginView");
        }, 1000);
    }

    $scope.showScreen = function (screen) {
        console.log("showScreen : " + screen);
        $scope._screen = screen;
        
        switch(screen) {
			case 'coldStart' :
				
                break;
			case 'loginView' :
				
                break;
            case 'loadView' :
                $scope.SELECT_DateList();
                break;
            case 'checkView' :
                
                break;
            case 'mainView' :
                
                break;
            case 'statisticsView' :
				$scope.initStatisticsView();
                break;
            case 'managerView' :
                
                break;
            default : 
                break;
        }
        $scope.$evalAsync(); //timeout 시에는 강제로 갱신필요
    }
    
    //******************** loginView Function ********************//
	
	$scope.clicklogin = function(info) {
		console.log("clicklogin");
		
		$scope._loginInfo = info;
		$scope.showScreen("loadView");
	}
	
    //******************** loadView Function ********************//
    
    $scope.clickCreateAttend = function(day) {
        
        var dateString = JSON.stringify($scope._dateList);
        var dateIdx = dateString.indexOf(day);
        
        if(dateIdx === -1) {
            var sCallback = function() {
                $scope.SELECT_Attend(day);
            }
            $scope.CREATE_Attend(day, sCallback);
        } else {
            console.log("이미 생성되어 있습니다.");
        }
    }
    
    $scope.clickSelectAttend = function(day) {
        
        $scope.SELECT_Attend(day);
    }
    
    //******************** checkView Function ********************//
    
    $scope.clickUpdateAttend = function() {
        
        $scope.UPDATE_Attend();
    }
    
    $scope.clickToggleCheck = function() {
        console.log("clickToggleCheck flag : "+$scope._checkFlag);
        
        if($scope._checkFlag == true) {
            $scope._checkFlag = false;
            $scope._checkText = "예배";
        } else {
            $scope._checkFlag = true;
            $scope._checkText = "모임";
        }
    }
    
    $scope.clickCheckAttend = function(state, id) {
        console.log("state : " + state);
        console.log("id : " + id);
        
        var index;
        
        for(var i=0; i < $scope._peopleList.length; i++){
            console.log("$scope._peopleList[i].id = "+$scope._peopleList[i].id);
            console.log("id = "+id);
            if($scope._peopleList[i].id == id) {
                index = i;
                break;
            }
        }
        
        console.log("index : " + index);
        if(state == "check1") {
            if($scope._peopleList[index].check1 == '1') {
                $scope._peopleList[index].check1 = '0';
            } else {
                $scope._peopleList[index].check1 = '1';
            }
        } else if(state == "check2") {
            if($scope._peopleList[index].check2 == '1') {
                $scope._peopleList[index].check2 = '0';
            } else {
                $scope._peopleList[index].check2 = '1';
            }
        }
    }
    
    //******************** mainView Function ********************//
    //******************** statisticsView Function ********************//
	
	$scope.initStatisticsView = function() {
		console.log("initStatisticsView");
		
		for(var i=0; i<$scope._peopleList.length; i++){
            if($scope._peopleList[i].gender == "1" && $scope._peopleList[i].check1 == "1"){//남자and예배
                $scope.count11 ++;
            }else if($scope._peopleList[i].gender == "2" && $scope._peopleList[i].check1 == "1"){//여자and예배
                $scope.count21 ++;
            } else if($scope._peopleList[i].gender == "1" && $scope._peopleList[i].check2 == "1"){//남자and모임
                $scope.count12 ++;
            }else if($scope._peopleList[i].gender == "2" && $scope._peopleList[i].check2 == "1"){//여자and모임
                $scope.count22 ++;
            }
        }
	};
	
	var clipboard = new Clipboard('#copyToClipboard', {
        text: function(){

            return $scope._loginInfo+'\n'
                +'예배: 남-'+$scope.count11+'명/여-'+$scope.count21+'명 = '+($scope.count11+$scope.count21)+'명\n'
                +'모임: 남-'+$scope.count12+'명/여-'+$scope.count22+'명 = '+($scope.count12+$scope.count22)+'명\n'
                +'새로 온 지체: 0명\n'
                +'오랜만에 온 지체: 0명\n';
        }
    });
    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
	
    //******************** managerView Function ********************//
    
    
    //******************** AJAX Function ********************//
    
    $scope.SELECT_DateList = function() { //1.날짜목록을 가져온다. Group By
        $http({
            method: 'POST',
            url: 'ajax/DateList_SELECT.php',
            data: $scope._loginInfo,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            $scope._dateList = res;
        }).error(function(e){
            
        });
//        $scope._dateList = [{date:"2018-01-01"}, {date:"2018-01-03"}, {date:"2018-01-08"}];
    }
    
    $scope.CREATE_Attend = function(day, sCallback) { //2. 오늘날짜에 출석을 만든다.
        console.log("CREATE_Attend day : " + day);
        
        $http({
            method: 'POST',
            url: 'ajax/Attend_CREATE.php',
            data: {
                day : day, 
                part : $scope._loginInfo
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            sCallback();
        }).error(function(e){

        });
    }
    
    $scope.SELECT_Attend = function(day) { //3.날짜에 해당하는 출석을 가져온다. 
        console.log("SELECT_Attend day : " + day);
        
        $http({
            method: 'POST',
            url: 'ajax/Attend_SELECT.php',
            data: {
                day : day, 
                part : $scope._loginInfo
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            $scope._peopleList = res;
            $scope._checkViewTitle = day;
			$scope.showScreen("checkView");
        }).error(function(e){
            
        });
//        $scope._peopleList = [{id:"180102_조대용",name:"조대용",gender:"1",age:"91",part:"모두공동체",group:"대호마을",isAttend:"1",created:"2018-01-01",check1:"0",check2:"0",date:"2018-01-01"},
//                              {id:"180102_조대호",name:"조대호",gender:"1",age:"90",part:"모두공동체",group:"대호마을",isAttend:"1",created:"2018-01-01",check1:"0",check2:"0",date:"2018-01-01"},
//                              {id:"180101_최지애",name:"최지애",gender:"2",age:"88",part:"모두공동체",group:"지애마을",isAttend:"1",created:"2018-01-01",check1:"0",check2:"0",date:"2018-01-01"},
//                              {id:"180101_차재능",name:"차재능",gender:"1",age:"91",part:"모두공동체",group:"지애마을",isAttend:"1",created:"2018-01-01",check1:"0",check2:"0",date:"2018-01-01"}
//                             ];
    }
    
    $scope.UPDATE_Attend = function() { //4.출석을 저장한다. create/update
        $http({
            method: 'POST',
            url: 'ajax/Attend_UPDATE.php',
            data: $scope._peopleList,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            console.log("저장되었습니다.");
        }).error(function(e){
            console.log("실패하였습니다.");
        });
    }
    
    $scope.getPerson = function() { //인원 한명에 정보를 가져온다.
        //추후작업
    }
    
    $scope.setPerson = function() { //인원 한명의 정보를 추가/변경한다.
        //추후작업
    }
});


    //******************** filter Function ********************//

ampApp.filter("getDay", function () {
    return function (input) {

        if(input == "") {
            return "출석";
        }
        // Your logic
        var dayNamesShort = ['일', '월', '화', '수', '목', '금', '토'];

        var today = new Date(input).getDay();
        var todayLabel = dayNamesShort[today];

        return input + " (" + todayLabel + ")";
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