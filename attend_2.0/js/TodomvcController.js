angular.module('todoapp',['angular.filter', 'ngAnimate', 'toastr', 'pr.longpress']).controller('TodomvcCtrl', function ($scope, $http, toastr) {
    
    $scope.nowDate = Date.now();
    $scope.attendData = [];
    $scope.toggleBtn = false;
    $scope.isAttendData = false;
    $scope.isPeopleData = false;
    $scope.nameArrVal = "";
    
    var clipboard = new Clipboard('#baba', {
        text: function(){
            var ntext = "";
            
            if($scope.part === 1){
                ntext = "우리";
            }else if($scope.part === 2){
                ntext = "모두";
            }else if($scope.part === 3){
                ntext = "함께";
            }
            
            return ntext+'공동체\n'
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
    
    //woori-dori program
    $scope.wooriBtn = function(){
        
        var filter = "win16|win32|win64|mac|macintel";
        if (navigator.platform) {
            if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                //mobile 
                toastr.error('PC 에서만 가능합니다');
            }
            else {
                //pc
                /*
                $scope.nameArr = ['이성호목사님','BBB'];
                for(var i=0; i<attendData.length; i++){
                    if(attendData[i].check2 == 1){
                        $scope.nameArr.push(attendData[i].name);
                    }
                }
                $scope.shuffle($scope.nameArr);
                */
                $('.wd-popup').css("display","block");
                $('.wd-popup-body').empty();//초기화
                /*
                $('.wd-popup-body').empty();//초기화
                var innerHTML = "";//초기화
        
                for(var j=0; j<$scope.nameArr.length; j++){
            
                    if(j%2 === 0){
                        innerHTML += '<div class="col-xs-12 col-sm-3 col-md-3 wd-list">';
                    }
                    innerHTML += $scope.nameArr[j];
            
                    if(j%2 === 0){
                        innerHTML += ' :::: ';
                    }
                    if(j%2 === 1){
                        innerHTML += '</div>';
                    }
                }
                $(".wd-popup-body").append(innerHTML);
                */
            }
        }
    };
    $scope.wooriReloadBtn = function(attendData){
        
        var inputArr = $scope.nameArrVal.split(',');
        
        $scope.nameArr = [];
        
        for(var m=0; m<inputArr.length; m++){
            $scope.nameArr.push(inputArr[m]);
            console.log("inputArr = "+inputArr[m]);
        }
        
        for(var i=0; i<attendData.length; i++){
            if(attendData[i].check2 == 1){
                $scope.nameArr.push(attendData[i].name);
            }
        }
        $scope.shuffle($scope.nameArr);
        
        $('.wd-popup-body').empty();//초기화
        var innerHTML = "";//초기화
        
        for(var j=0; j<$scope.nameArr.length; j++){
            
            if(j%2 === 0){
                innerHTML += '<div class="col-xs-12 col-sm-3 col-md-3 wd-list">';
            }
            innerHTML += $scope.nameArr[j];
            
            if(j%2 === 0){
                innerHTML += ' :::: ';
            }
            if(j%2 === 1){
                innerHTML += '</div>';
            }
        }
        $(".wd-popup-body").append(innerHTML);
    };
    $scope.wooriCancelBtn = function(){
        $('.wd-popup').css("display","none");
    };
    $scope.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };
    
//    $scope.randomVal = function(){
//        return Math.random();    
//    };
    
    $scope.MTBtn = function(){
        $(".material-button-toggle").toggleClass('open');
        $('.option').toggleClass('scale-on');
    };
    
    $scope.toggleFunc = function(bool){
        $scope.toggleBtn = bool;
    };
    
    $scope.longPressInfo = function(data){
        console.log("longPressInfo");
        alert("name : "+data.name+"\nphone : "+data.phone+"\ngroup : "+data.group);
    };
    $scope.checkView1 = function(data){
        console.log("data = "+data.check1);
        
        if(data.check1 === '0'){
            $("#item_"+data.id).css("background","rgba(0,0,0,0.5)");
            data.check1 = '1';
        }else if(data.check1 === '1'){
            $("#item_"+data.id).css("background","rgba(0,0,0,0.1)");
            data.check1 = '0';
        }
    };
    $scope.checkView2 = function(data){
        console.log("data = "+data.check2);
        
        if(data.check2 === '0'){
            $("#item2_"+data.id).css("background","rgba(0,0,0,0.5)");
            data.check2 = '1';
        }else if(data.check2 === '1'){
            $("#item2_"+data.id).css("background","rgba(0,0,0,0.1)");
            data.check2 = '0';
        }
    };
    $scope.getCounter = function(data){
        $scope.count11 = 0;
        $scope.count12 = 0;
        $scope.count21 = 0;
        $scope.count22 = 0;
        for(var i=0; i<data.length; i++){
            if(data[i].sex == 1 && data[i].check1 == 1){//남자and예배
                $scope.count11 ++;
            }else if(data[i].sex == 2 && data[i].check1 == 1){//여자and예배
                $scope.count21 ++;
            }
        }
        for(var i=0; i<data.length; i++){
            if(data[i].sex == 1 && data[i].check2 == 1){//남자and모임
                $scope.count12 ++;
            }else if(data[i].sex == 2 && data[i].check2 == 1){//여자and모임
                $scope.count22 ++;
            }
        }
    };

    $scope.getPeopleData = function(part) {
        console.log("part = "+part);
        $http({
            method: 'POST',
            url: 'ajax/getPeopleData.php',
            data: part,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data){
            $scope.part = part;
            $scope.tasks = data;
            $scope.isPeopleData = true;
            console.log("getPeopleData isPeopleData = "+$scope.isPeopleData);
        });
    };
    
    $scope.getDateData = function(){
        $http({
            method: 'POST',
            url: 'ajax/getDateData.php',
            data: $scope.part,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data){
            $scope.dateData = data;
        });
    };
    
    $scope.createAttendData = function(tasks, day){
        console.log("date = "+day);
        console.log("tasks.length = "+tasks.length);
        
        //dateData JSON 파일을 string type으로 변환하여 오늘날짜(day) 값이 있는지 확인
        var dateString = JSON.stringify($scope.dateData);
        var dateIdx = dateString.indexOf(day);
        
        if(dateIdx === -1){
            $http.post("ajax/createAttendData"+$scope.part+".php?tasks=" + tasks.length).success(function(data){
                console.log("data = "+ JSON.stringify(data));
                $scope.selectAttendData(day, $scope.part);
            });
            
        }else{
            toastr.info('이미 생성되어 있습니다');
        }
    };
    
    $scope.selectAttendData = function(day, part){
        console.log("day = "+day);
        $scope.dayDisp = day;
        $http({
            method: 'POST',
            url: 'ajax/selectAttendData.php',
            data: {day: day, part: part},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data){
            console.log("data = "+data);
            toastr.info(day+' 불러옴');
            $("#main-title").text(day);
            $scope.attendData = data;
            $scope.isAttendData = true;
        });
    };
    
    $scope.updateAttendData = function(attendData){
        $http({
            method: 'POST',
            url: 'ajax/updateAttendData'+$scope.part+'.php',
            data: attendData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data){
            console.log("data = "+ data);
            toastr.success('저장되었습니다');
        });
    };
    
    $scope.dropAttendData = function(day){
        console.log("day = "+day);
        $http({
            method: 'POST',
            url: 'ajax/dropAttendData'+$scope.part+'.php',
            data: day,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data){
            console.log("data = "+data);
            toastr.info('삭제되었습니다');
        });
    };
    
    $scope.JsonToCVS = function(JSONData, ReportTitle, ShowLabel){
        
        var filter = "win16|win32|win64|mac|macintel";
        if (navigator.platform) {
            if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                //mobile 
                toastr.error('PC 에서만 가능합니다');
            }
            else {
                //pc 
                console.log("JsonToCVS");
                //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                var CSV = '';
                //Set Report title in first row or line
                CSV += ReportTitle + '\r\n\n';
                //This condition will generate the Label/Header
                if (ShowLabel) {
                    var row = "";
                    //This loop will extract the label from 1st index of on array
                    for (var index in arrData[0]) {
                        //Now convert each value to string and comma-seprated
                        row += index + ',';
                    }
                    row = row.slice(0, -1);
                    //append Label row with line break
                    CSV += row + '\r\n';
                }
                //1st loop is to extract each row
                for (var i = 0; i < arrData.length; i++) {
                    var row = "";
                    //2nd loop will extract each column and convert it in string comma-seprated
                    for (var index in arrData[i]) {
                        row += '"' + arrData[i][index] + '",';
                    }
                    row.slice(0, row.length - 1);
                    //add a line break after each row
                    CSV += row + '\r\n';
                }
                if (CSV == '') {
                    alert("Invalid data");
                    return;
                }
                //Generate a file name
                var fileName = $scope.dayDisp+"_";
                //this will remove the blank-spaces from the title and replace it with an underscore
                fileName += ReportTitle.replace(/ /g, "_");
                //Initialize file format you want csv or xls
                //var uri = 'data:text/csv;charset=utf-8,' + escape(CSV); 인코딩문제수정
                var uri = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(CSV);
                // Now the little tricky part.
                // you can use either>> window.open(uri);
                // but this will not work in some browsers
                // or you will not get the correct file extension    
                //this trick will generate a temp <a /> tag
                var link = document.createElement("a");
                link.href = uri;
                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";
                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                toastr.success('다운로드가 완료되었습니다');
            }
        }
    };
    
}).filter("getDay", function(){
   return function(input){
       // Your logic
       var dayNamesShort = ['일','월','화','수','목','금','토'];
       
       var today = new Date(input).getDay();
       var todayLabel = dayNamesShort[today];

       return input+" ("+todayLabel+")"; 
   }
   
}).filter("isGetDay", function(){
   return function(input){
       // Your logic
       //var dayNamesShort = ['일','월','화','수','목','금','토'];
       
       var today = new Date(input).getDay();
       //var todayLabel = dayNamesShort[today];
       
       if(today === 0){
           return true;
       }else{
           return false;
       }
   }
});
