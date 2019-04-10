/*
*'angular.filter' -> ng-repeat key/value 를 하기 위해 필요한 값
*
*/
var ampApp = angular.module('ampApp', ['angular.filter']);

ampApp.controller('ampCtrl', function ($scope, $timeout, $http) {

    //******************** common Function ********************//
    
    $scope.nowDate = Date.now();
    $scope._screen = "coldStart"; //default :: coldStart
	$scope._dummyData = false; //크롬 테스트용
    
	$scope._loginInfo = ""; //우리공동체, 모두공동체, 함께공동체
    $scope._checkFlag = false; //false:예배, true:모임
    $scope._checkText = "예배";
    $scope._checkViewTitle = ""; //날짜 2019-01-01
	$scope._toastText = "";
	$scope._showToast = false;
	$scope._showLoading = false;
	$scope._managerViewInputText = "";
    $scope._managerCreateMode = "default"; //default, create
    $scope._dateList = []; //날짜목록
    $scope._peopleList = []; //인원목록
    $scope._manageList = []; //관리목록
	$scope._manageInputObj = {};
    
    $scope.onload = function () {
        //init : 앱이 실행됬을 때 최초로 실행되는 부분
        $scope.showScreen("loginView");
        $scope.showDummyData($scope._dummyData);
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
                $scope.managerInit();
                break;
            default : 
                break;
        }
        $scope.$evalAsync(); //timeout 시에는 강제로 갱신필요
    }
    
    $scope.toastMessage = function(message) {
        console.log("toastMessage : " + message);
        
        $scope._toastText = message;
        
        $scope._showToast = true;
        $timeout(function() {
            $scope._showToast = false;
        }, 1000);
    }
	
	$scope.loading = {
		start : function(){
			$scope._showLoading = true;
		},
		stop : function(){
			$scope._showLoading = false;
		}
	}
	

	$scope.formatedDate = function (date, type) {
		var d = date, 
			month = '' + (d.getMonth() + 1), 
			day = '' + d.getDate(), 
			year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		
		if(type == 1){
			year = year.toString();
			year = year.substring(2,4);
			return [year, month, day].join('');
		}else if(type == 2){
			return [year, month, day].join('-');
		}else{
			return [year, month, day].join('-');
		}
		
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
        var week = new Date(day).getDay();
        
        if(dateIdx === -1) { //이미 존재하는 날짜가 있는지 확인한다.
            if(week === 0) { //일요일이 아닌날에 생성하지 않도록 한다.
                var sCallback = function() {
                    $scope.SELECT_Attend(day);
                }
                $scope.CREATE_Attend(day, sCallback);
            } else {
                $scope.toastMessage("주일에만 만들 수 있습니다.");
            }
        } else {
            $scope.toastMessage("이미 생성되어 있습니다.");
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
		
        $scope.count11 = 0;
        $scope.count12 = 0;
        $scope.count21 = 0;
        $scope.count22 = 0;
        
		for(var i=0; i<$scope._peopleList.length; i++){
            if($scope._peopleList[i].gender == "1" && $scope._peopleList[i].check1 == "1"){//남자and예배
                $scope.count11 ++;
            }else if($scope._peopleList[i].gender == "2" && $scope._peopleList[i].check1 == "1"){//여자and예배
                $scope.count21 ++;
            }
        }
        
        for(var i=0; i<$scope._peopleList.length; i++) {
            if($scope._peopleList[i].gender == "1" && $scope._peopleList[i].check2 == "1"){//남자and모임
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
        $scope.toastMessage("클립보드에 저장되었습니다.");
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
	
    //******************** managerView Function ********************//
	
	$scope.managerInit = function(){
		console.log("managerInit");
		$scope._manageList = [];
		$scope._managerViewInputText = "";
		$scope._managerCreateMode = "default";
		$scope._manageInputObj = {
			id : "",
			name : "",
			gender : "2",
			age : "",
			part : "",
			group : "",
			isAttend : "1",
			created : ""
		}
	}
    
	$scope.managerDefaultState = function(){
        console.log("managerDefaultState");
        $scope._managerCreateMode = "default";
        for(var i=0; i<$scope._manageList.length; i++){
            $scope._manageList[i].isAttend = "1";
        }
        $scope._manageInputObj = {
			id : "",
			name : "",
			gender : "2",
			age : "",
			part : "",
			group : "",
			isAttend : "1",
			created : ""
		}
    }
    
    $scope.clickSearchPerson = function(input) {
		console.log("clickSearchPerson : "+input);
		$scope.getPerson(input);
	}
    
    $scope.clickManagerCreate = function(mode, state) {
        console.log("clickManagerCreate : "+mode);
        var emptyValue = false;
        
        if(state == "default"){
            $scope.managerDefaultState();
        }
        
        $scope._managerCreateMode = mode;
		
		if(state == "done"){
			var idTime = $scope.formatedDate(new Date(), 1);
			var createdTime = $scope.formatedDate(new Date(), 2);
			
			$scope._manageInputObj.id = idTime+"_"+$scope._manageInputObj.name;
			$scope._manageInputObj.part = $scope._loginInfo;
			$scope._manageInputObj.created = createdTime;
			
			console.log("_manageInputObj : "+JSON.stringify($scope._manageInputObj));
			
            angular.forEach($scope._manageInputObj, function(key, value){
                if($scope._manageInputObj[value] == ""){
                    console.log("key : "+value+" value : "+$scope._manageInputObj[value]);
                    emptyValue = true;
                }
            });
            
            if(emptyValue === false){
                $scope.createPerson($scope._manageInputObj);
                $scope.managerInit();
            }else{
                $scope.toastMessage("빈칸이 있으면 안됩니다");
                $scope._managerCreateMode = "create";
            }
		}else if(state == "cancel"){
            
        }else if(state == "default"){
            
        }
    }
    
	$scope.clickGenderToggle = function(data, index) {
		if(index != null){
			$scope._manageList[index].gender = data;
		}else{
			$scope._manageInputObj.gender = data;
		}
	}
	
    $scope.clickManagerItem = function(view, index, button) {
        console.log("clickManagerItem : "+view+" | "+index);
        
        if(button == "default"){
            $scope.managerDefaultState();
        }
        
        var isAttend = 1;
		if(view == "modify"){
			isAttend = 2;
		}else if(view == "delete"){
			isAttend = 3;
		}else{ //default
			isAttend = 1;
		}
		$scope._manageList[index].isAttend = isAttend;
		
        console.log("managerList = "+JSON.stringify($scope._manageList[index]));
        console.log("_manageInputObj = "+JSON.stringify($scope._manageInputObj));
        
        if(button == "modify"){
            $scope._manageList[index] = $scope._manageInputObj;
            $scope.modifyPerson($scope._manageList[index]);
            $scope.managerInit();
        }else if(button == "delete"){
            $scope._manageList[index] = $scope._manageInputObj;
            $scope.deletePerson($scope._manageList[index].id);
            $scope.managerInit();
        }else if(button == "cancel"){

        }else if(button == "default"){
            angular.copy($scope._manageList[index], $scope._manageInputObj); //링크x 값복사
        }
    }
    //******************** AJAX Function ********************//
    
    $scope.SELECT_DateList = function() { //1.날짜목록을 가져온다. Group By
		$scope.loading.start();
        $http({
            method: 'POST',
            url: 'ajax/DateList_SELECT.php',
            data: $scope._loginInfo,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            $scope._dateList = res;
            $scope.toastMessage("날짜 목록을 불러옵니다.");
			$scope.loading.stop();
        }).error(function(e){
            $scope.toastMessage("날짜 목록을 불러오지 못했습니다.");
			$scope.loading.stop();
        });
    }
    
    $scope.CREATE_Attend = function(day, sCallback) { //2. 오늘날짜에 출석을 만든다.
        console.log("CREATE_Attend day : " + day);
        $scope.loading.start();
		
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
			$scope.loading.stop();
            sCallback();
        }).error(function(e){
			$scope.loading.stop();
            $scope.toastMessage("새로만들기가 실패하였습니다.");
        });
    }
    
    $scope.SELECT_Attend = function(day) { //3.날짜에 해당하는 출석을 가져온다. 
        console.log("SELECT_Attend day : " + day);
		$scope.loading.start();
		
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
			$scope.loading.stop();
            $scope._peopleList = res;
            $scope._checkViewTitle = day;
			$scope.showScreen("checkView");
        }).error(function(e){
			$scope.loading.stop();
            $scope.toastMessage("출석정보를 가져오지 못했습니다.");
        });
    }
    
    $scope.UPDATE_Attend = function() { //4.출석을 저장한다. create/update
		$scope.loading.start();
		
        $http({
            method: 'POST',
            url: 'ajax/Attend_UPDATE.php',
            data: $scope._peopleList,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
			$scope.loading.stop();
            $scope.toastMessage("저장되었습니다.");
        }).error(function(e){
			$scope.loading.stop();
            $scope.toastMessage("저장에 실패하였습니다.");
        });
    }
    
    $scope.getPerson = function(input) { //인원 한명에 정보를 가져온다.
		console.log("getPerson : "+input);
        $scope.loading.start();
		
        $scope._manageList = [];
        
        $http({
            method: 'POST',
            url: 'ajax/Person_SELECT.php',
            data: input,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            console.log("res = "+JSON.stringify(res));
            if(res != null && res != "null" && angular.isObject(res)){
                $scope._manageList = res;
                $scope.toastMessage("검색되었습니다.");
            }else{
                $scope.toastMessage("검색한 이름은 없습니다.");
            }			
			$scope.loading.stop();
        }).error(function(e){
			$scope.loading.stop();
            $scope.toastMessage("검색실패하였습니다.");
        });
    }
    
    $scope.createPerson = function(input) { //인원 한명의 정보를 변경한다.
        console.log("createPerson : "+JSON.stringify(input));
        $scope.loading.start();
		        
        $http({
            method: 'POST',
            url: 'ajax/Person_CREATE.php',
            data: input,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
			console.log("res : "+JSON.stringify(res));
            if(res == "successfully"){
                $scope.toastMessage("추가되었습니다.");
            }else{
                $scope.toastMessage("추가실패하였습니다.");
            }
            $scope.loading.stop();
        }).error(function(e){
			$scope.loading.stop();
            $scope.toastMessage("추가실패하였습니다.");
        });
    }
    
    $scope.modifyPerson = function(input) { //인원 한명의 정보를 변경한다.
        console.log("modifyPerson : "+JSON.stringify(input));
        $scope.loading.start();
		        
        $http({
            method: 'POST',
            url: 'ajax/Person_UPDATE.php',
            data: input,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
			console.log("res : "+JSON.stringify(res));
            if(res == "successfully"){
                $scope.toastMessage("수정되었습니다.");
            }else{
                $scope.toastMessage("수정실패하였습니다.");
            }
            $scope.loading.stop();
        }).error(function(e){
			$scope.loading.stop();
            $scope.toastMessage("수정실패하였습니다.");
        });
    }
    
	$scope.deletePerson = function(input) { //인원 한명을 삭제한다.
		console.log("deletePerson : "+input);
        $scope.loading.start();
		        
        $http({
            method: 'POST',
            url: 'ajax/Person_DELETE.php',
            data: input,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res){
            $scope.toastMessage("삭제하였습니다.");		
			$scope.loading.stop();
        }).error(function(e){
			$scope.loading.stop();
            $scope.toastMessage("삭제실패하였습니다.");
        });
    }
	
    //******************** Another Function ********************//
    
    $scope.showDummyData = function(flag) {
        
        if(flag) {
            
            //DUMMY DATA
            $scope._peopleList = [{id:"180102_조대용",name:"조대용",gender:"1",age:"91",part:"모두공동체",group:"대호마을",isAttend:"1",created:"2018-01-01",check1:"0",check2:"0",date:"2018-01-01"},
                                      {id:"180102_조대호",name:"조대호",gender:"1",age:"90",part:"모두공동체",group:"대호마을",isAttend:"1",created:"2018-01-01",check1:"0",check2:"0",date:"2018-01-01"},
                                      {id:"180101_최지애",name:"최지애",gender:"2",age:"88",part:"모두공동체",group:"지애마을",isAttend:"1",created:"2018-01-01",check1:"0",check2:"0",date:"2018-01-01"},
                                      {id:"180101_차재능",name:"차재능",gender:"1",age:"91",part:"모두공동체",group:"지애마을",isAttend:"1",created:"2018-01-01",check1:"0",check2:"0",date:"2018-01-01"}
                                     ];
            $scope._dateList = [{date:"2018-01-01"}, {date:"2018-01-03"}, {date:"2018-01-08"}];
        }
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

ampApp.filter("getGender", function () {
    return function (input) {

		if(input == 1){
			return "남자"
		}else if(input == 2){
			return "여자"
		}else{
			return "없음"
		}
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