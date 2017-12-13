window.onload = function () {
//    kCalendar('kCalendar');
    makeEmotionList();
    makeDesireList();
    makeResultList();
};

var list = {
    emotion : ["긴장된", "초조한", "조바심 나는", "안절부절못하는", "전전긍긍하는", "안달복달하는", "조급한", "조심스러운",
                   "걱정스러운", "겁나는", "겁먹은", "굳어버린", "다리가 후들거리는", "떨리는", "불안한 손에 땀을 쥐게 하는",
                   "무서운", "두려운", "소름끼치는", "애타는", "얼어붙은", "숨이 막힐 듯한", "심장이 멎는 듯한", "등골이 오싹한",
                   "공포스러운"],
    desire : ["봉사", "친밀한 관계", "유대", "소통", "연결", "배려", "존중", "상호성", "공감", "이해", "수용", "지지", "협력",
              "도움", "감사", "인정", "승인", "사랑", "애정", "관심", "호감", "우정", "가까움", "나눔", "소속감", "공동체",
              "안도", "위안", "신뢰", "확신", "예측가능성", "정서적 안전", "자기 보호", "일관성", "안정성"],
    result : ["신뢰", "확신", "예측가능성", "정서적 안전"]
}

var makeEmotionList = function() {

    var emotionDiv = "";
    
    console.log("list.emotion.length = "+list.emotion.length);
    for(var i=0; i < list.emotion.length; i++) {
        emotionDiv += '<div class="elist">'+list.emotion[i]+'</div>';
    }
    
    $("#emotionList").append(emotionDiv);
}

var makeDesireList = function() {
    
    var desireDiv = "";
    
    console.log("list.desire.length = "+list.desire.length);
    for(var i=0; i < list.desire.length; i++) {
        desireDiv += '<div class="dlist">'+list.desire[i]+'</div>';
    }
    
    $("#desireList").append(desireDiv);
}

var makeResultList = function() {
    
    var resultDiv = "";
    
    for(var i=0; i < list.result.length; i++) {        
        resultDiv += '<div class="col-xs-6 col-sm-3 col-md-2 cardHeight"><div class="rlist">'+list.result[i]+'</div></div>';
    }
    
    $("#resultList").append(resultDiv);
    
    $(".cardHeight").css("height","331px");
    $(".rlist").css("line-height","331px");
}

