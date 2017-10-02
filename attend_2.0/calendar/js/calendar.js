window.onload = function () {
			kCalendar('kCalendar');
};

var kCalendar = function(id, date){
    var kCalendar = document.getElementById(id);
    
    if(typeof(date) !== 'undefined'){
        date = date.split('-');
        date[1] = date[1]-1;
        date = new Date(date[0], date[1], date[2]);
    }else{
        var date = new Date();
    }
    
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth()+1;
    var currentDate = date.getDate();

    //config
    var monthLastDay = [31,28,31,30,31,30,31,31,30,31,30,31];
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var monthNamesShort =  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var	dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayNamesShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    //윤년 계산
    if(currentYear % 4 === 0 && currentYear % 100 !== 0 || currentYear % 400 === 0){
        monthLastDay[1] = 29;
    }

    //이번달 첫번째날 요일 구하기
    //var theDate = new Date(currentYear,currentMonth,1);
    //var currentDay = theDate.getDay();
    date.setDate(1);
    var currentDay = date.getDay();
    
    var week = 6;
    
    //prevDate 정의
    if(currentMonth !== 1){
        var prevDate = currentYear + '-' + (currentMonth - 1) + '-' + currentDate;
    }else{
        var prevDate = (currentYear - 1) + '-' + 12 + '-' + currentDate;
    }
    
    //nextDate 정의
    if(currentMonth !== 12){
        var nextDate = currentYear + '-' + (currentMonth + 1) + '-' + currentDate;
    }else{
        var nextDate = (currentYear + 1) + '-' + 1 + '-' + currentDate;
    }
    
    //view
    var calendar = '';
    calendar += '<div id="header">';
    calendar += '   <div class="header-left">';
    calendar += '       <div class="btn-group" role="group" aria-label="...">';
    calendar += '           <button type="button" class="btn btn-default" onclick="kCalendar(\'' +  id + '\', \'' + prevDate + '\')"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>';
    calendar += '           <button type="button" class="btn btn-default"><strong>Today</strong></button>';
    calendar += '           <button type="button" class="btn btn-default" onclick="kCalendar(\'' +  id + '\', \'' + nextDate + '\')"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></button>';
    calendar += '       </div>';
    calendar += '   </div>';
    calendar += '   <div class="header-center"><h2>' + monthNames[currentMonth - 1] + ' ' + currentYear + '</h2></div>';
    calendar += '   <div class="header-right">';
    calendar += '       <div class="btn-group" role="group" aria-label="...">';
    calendar += '           <button type="button" class="btn btn-default"><strong>Logout</strong></button>';
    calendar += '       </div>';
    calendar += '       <button type="button" class="btn btn-default"><span class="glyphicon glyphicon glyphicon-plus"></button>';
    calendar += '       <button type="button" class="btn btn-default"><span class="glyphicon glyphicon glyphicon-cog"></button>';
    calendar += '   </div>';
    calendar += '</div>';
    calendar += '<table class="table table-bordered">';
    calendar += '	<thead>';
    calendar += '		<tr>';
    calendar += '			<th class="sun table-title">'+dayNamesShort[0]+'</th>';
    calendar += '			<th class="mon table-title">'+dayNamesShort[1]+'</th>';
    calendar += '			<th class="tue table-title">'+dayNamesShort[2]+'</th>';
    calendar += '			<th class="wed table-title">'+dayNamesShort[3]+'</th>';
    calendar += '			<th class="thu table-title">'+dayNamesShort[4]+'</th>';
    calendar += '			<th class="fri table-title">'+dayNamesShort[5]+'</th>';
    calendar += '			<th class="sat table-title">'+dayNamesShort[6]+'</th>';
    calendar += '		</tr>';
    calendar += '	</thead>';
    calendar += '	<tbody>';
    
    var dateNum = 1 - currentDay;
    var currentLastDate = monthLastDay[currentMonth - 1];
    
    for(var i = 0 ; i < week ; i++){
        calendar += '<tr>';
        for(var j = 0; j < 7; j++, dateNum++) {
            if( dateNum < 1 || dateNum > currentLastDate ) {
                /* 이전/다음 월 미리보기
                if(dateNum > currentLastDate){
                    calendar += '<td class="' + monthNamesShort[j] + ' table-list" style="background-color:powderblue;">' + currentYear +'-'+ (currentMonth + 1) +'-'+ (dateNum - currentLastDate) +'</td>';
                }else{
                    calendar += '<td class="' + monthNamesShort[j] + ' table-list" style="background-color:powderblue;">' + currentYear +'-'+ (currentMonth - 1) +'-'+ (monthLastDay[currentMonth-2] + dateNum) +'</td>';
                }
                */
                if(dateNum > currentLastDate){
                    calendar += '<td class="' + monthNamesShort[j] + ' table-list"></td>';
                }else{
                    calendar += '<td class="' + monthNamesShort[j] + ' table-list"></td>';
                }
                continue;
            }
            if(j === 6){//토요일
                calendar += '<td class="' + monthNamesShort[j] + ' table-list" id="'+ currentYear +'-'+ (currentMonth) +'-'+ dateNum +'" onclick="disp(20170101)" style="color:blue;"><div class="date-num">' + dateNum + '</div><ul class="list-unstyled"></ul></td>';
            }else if(j === 0){//일요일
                calendar += '<td class="' + monthNamesShort[j] + ' table-list" id="'+ currentYear +'-'+ (currentMonth) +'-'+ dateNum +'" onclick="disp(20170101)" style="color:red;"><div class="date-num">' + dateNum + '</div><ul class="list-unstyled"></ul></td>';
            }else{
                calendar += '<td class="' + monthNamesShort[j] + ' table-list" id="'+ currentYear +'-'+ (currentMonth) +'-'+ dateNum +'" onclick="disp(20170101)"><div class="date-num">' + dateNum + '</div><ul class="list-unstyled"></ul></td>';
            }
        }
        calendar += '</tr>';
    }
    calendar += '</tbody>';
    calendar += '</table>';
    
    kCalendar.innerHTML = calendar;
    
    //날짜와 색깔-숫자를 입력하면 표시해주는 함수
    /*
    view("2017-4-3",0);
    view("2017-5-15",1);
    view("2017-4-25",2);
    view("2017-4-26",2);
    view("2017-4-27",2);
    */
    view2("2017-4-9","동창회모임","blue");
    view2("2017-4-10","동창회모임","blue");
    view2("2017-4-11","동창회모임","blue");
    view2("2017-4-12","동창회모임","blue");
    view2("2017-4-13","동창회모임","blue");
    view2("2017-4-14","동창회모임","blue");
    view2("2017-4-15","동창회모임","blue");

    view2("2017-5-15","동창회모임","blue");
    view2("2017-4-13","가족회식","red");
    
    view2("2017-4-1","동아리","green");
    view2("2017-4-2","동아리","green");
    view2("2017-4-3","동아리","green");
    view2("2017-4-4","동아리","green");
    
    var dataArr = [];
    var dataObj = {};
    dataObj.start = "2017-1-1";
    dataObj.last = "2017-1-1";
    dataObj.title = "동기모임";
    dataObj.locate = "신촌역";
    dataObj.color = "blue";
    dataObj.bool = false;
    dataArr.push(dataObj);
    var dataObj = {};
    dataObj.start = "2017-1-2";
    dataObj.last = "2017-1-2";
    dataObj.title = "서울모임";
    dataObj.locate = "야탑역";
    dataObj.color = "red";
    dataObj.bool = false;
    dataArr.push(dataObj);
    console.log(JSON.stringify(dataArr));
    console.log(dataArr[0].start);
    //var data = [{"2017-1-1","2017-1-1","동기모임","장소","개인","휴가아님"},{"2017-1-2","2017-1-3","여행","장소","개인","휴가임"}];
};

function disp(day){
        console.log(day);
};

var view = function(day,color){
    console.log("color = "+ color);
    switch(color){
        case 0 :
            $('#'+day).css("background-color","rgba(0,0,0,0.2)");
            break;
        case 1 :
            $('#'+day).css("background-color","rgba(255,0,0,0.2)");
            break;
        case 2 :
            $('#'+day).css("background-color","rgba(0,255,0,0.2)");
            break;
    }
}

var view2 = function(day,text,color){
    console.log("day = "+day+" text = "+text);
    $('#'+day+' ul').append('<li style="background-color:'+color+';">'+text+'</li>');
};