window.onload = function () {
    makeEmotionList();
    makeDesireList();
    
	showScreen("coldStart"); //처음진입시 coldstart 화면 3초 유지
	setTimeout(function() {
		showScreen("mainView");
		
	},3000);
};

var list = {
    emotion : ["긴장된", "초조한", "조바심 나는", "안절부절못하는", "전전긍긍하는", "안달복달하는", "조급한", "조심스러운",
                   "걱정스러운", "겁나는", "겁먹은", "굳어버린", "다리가 후들거리는", "떨리는", "불안한 손에 땀을 쥐게 하는",
                   "무서운", "두려운", "소름끼치는", "애타는", "얼어붙은", "숨이 막힐 듯한", "심장이 멎는 듯한", "등골이 오싹한",
                   "공포스러운"],
    desire : ["봉사", "친밀한 관계", "유대", "소통", "연결", "배려", "존중", "상호성", "공감", "이해", "수용", "지지", "협력",
              "도움", "감사", "인정", "승인", "사랑", "애정", "관심", "호감", "우정", "가까움", "나눔", "소속감", "공동체",
              "안도", "위안", "신뢰", "확신", "예측가능성", "정서적 안전", "자기 보호", "일관성", "안정성"],
    result : []
}

var makeEmotionList = function() {

    var emotionDiv = "";
    
    console.log("list.emotion.length = "+list.emotion.length);
    for(var i=0; i < list.emotion.length; i++) {
        emotionDiv += '<div class="elist" id="elist_'+i+'" onclick="selectItem(\'' +  list.emotion[i] + '\', \'' + list.emotion[i] + '\')">'+list.emotion[i]+'</div>';
    }
    
    $("#emotionList").append(emotionDiv);
}

var makeDesireList = function() {
    
    var desireDiv = "";
    
    console.log("list.desire.length = "+list.desire.length);
    for(var i=0; i < list.desire.length; i++) {
        desireDiv += '<div class="dlist" id="dlist_'+i+'" onclick="selectItem(\'' +  list.desire[i] + '\', \'' + list.desire[i] + '\')">'+list.desire[i]+'</div>';
    }
    
    $("#desireList").append(desireDiv);
}

var makeResultList = function() {
    
    var resultDiv = "";
    
    console.log("list.result.length = "+list.result.length);
    console.log("list.result = "+JSON.stringify(list.result));
    for(var i=0; i < list.result.length; i++) {        
        resultDiv += '<div class="col-xs-6 col-sm-3 col-md-2 cardHeight"><div class="rlist">'+list.result[i]+'</div></div>';
    }
    
    $("#resultList").append(resultDiv);
    
    $(".cardHeight").css("height","331px");
    $(".rlist").css("line-height","331px");
    
    list.result = [];//초기화
}

var selectItem = function(item) {
    
    console.log("select Item = "+item);
    
    if(list.result.length < 4) {
        list.result.push(item);
    } else {
        console.log("no more select Item");
        console.log("list.result = "+JSON.stringify(list.result));
    }
}

var showScreen = function(screen) {
    $("#mainView").css("display","none");
    $("#desireView").css("display","none");
    $("#emotionView").css("display","none");
    $("#resultView").css("display","none");
    $("#coldStart").css("display","none");
    
    $("#"+screen).css("display","block");
    
    if(screen == "resultView") {
        makeResultList();
    } else {
        $("#resultList").empty(); //back시에만 해주는 것으로 바꾸기
    }
}