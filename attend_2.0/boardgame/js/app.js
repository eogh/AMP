var isToast = false;

var color = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "white"];

var game = [
    ["출발", "출발", "출발"], //시작
    ["참참참(팀에서 3명) 전원 성공", "참참참(팀에서 4명) 전원 성공", "참참참(팀에서 5명) 전원 성공"], //2
    ["과자 3번 던져서 1번이상 받아먹기 (팀에서 1명)", "과자 3번 던져서 2번이상 받아먹기 (팀에서 1명)", "과자 1번에 받아먹기 (팀에서 1명)"], //3
    ["미션패스권", "미션패스권", "미션패스권"], //4 황금열쇠
    ["티슈 입으로 불어서 30초 동안 안 떨어뜨리기(팀에서 2명)", "티슈 입으로 불어서 30초 동안 안 떨어뜨리기(팀에서 3명)", "티슈 입으로 불어서 30초 동안 안 떨어뜨리기(팀에서 4명)"], //5
    ["전주 듣고 10초 안에 노래제목 맞추기 (팀 전원)", "전주 듣고 7초 안에 노래제목 맞추기 (팀 전원)", "전주 듣고 5초 안에 노래제목 맞추기 (팀 전원)"], //6
    ["책 펴서 사람 인원수 10명 넘기 (팀에서 3명 합계)", "책 펴서 사람 인원수 20명 넘기 (팀에서 3명 합계)", "책 펴서 사람 인원수 30명 넘기 (팀에서 3명 합계)"], //7
    ["다음 턴 주사위x2만큼 전진", "다음 턴 주사위x2만큼 전진", "다음 턴 주사위x2만큼 전진"], //8 황금열쇠
    ["꽝(한턴쉬기), 꽝(한턴쉬기), 꽝(한턴쉬기)"], //9
    ["다음 턴 짝수 주사위 나오면 탈출! 안나오면 다음 턴 탈출", "다음 턴 짝수 주사위 나오면 탈출! 안나오면 다음 턴 탈출", "다음 턴 짝수 주사위 나오면 탈출! 안나오면 다음 턴 탈출"], //10 무인도
    ["초성 만들기 (30초 동안) 10개 만들기 (팀 전원)", "초성 만들기 (25초 동안) 10개 만들기 (팀 전원)", "초성 만들기 (20초 동안) 10개 만들기 (팀 전원)"], //11
    ["다음 턴 주사위+3만큼 전진", "다음 턴 주사위+3만큼 전진", "다음 턴 주사위+3만큼 전진"], //12 황금열쇠
    ["사회자와 가위바위보 해서 이기기", "사회자와 가위바위보 해서 지기", "사회자와 가위바위보 해서 비기기"], //13
    ["제시어가 나오면 팀원이 다 같은 자세를 취해야 한다.(팀에서 3명)", "제시어가 나오면 팀원이 다 같은 자세를 취해야 한다.(팀에서 4명)", "제시어가 나오면 팀원이 다 같은 자세를 취해야 한다.(팀에서 5명)"], //14
    ["통과", "통과", "통과"], //15
    ["쌩쌩이 연속 3개 (팀중에 1명)", "쌩쌩이 연속 5개 (팀중에 1명)", "쌩쌩이 연속 10개 (팀중에 1명)"], //16
    ["판치기로 동전 3개중 1개 뒤집기", "판치기로 동전 3개중 2개 뒤집기", "판치기로 동전 전부 뒤집기"], //17
    ["5번 안에 물병세우기", "5번 안에 물병세우기", "5번 안에 물병세우기"]]; //18

var gameTitle = ["출발 =>=>", //시작
                "참참참",
                "과자받기",
                "황금열쇠", //4 황금열쇠
                "티슈날리기",
                "노래맞추기",
                "책게임",
                "황금열쇠", //8 황금열쇠
                "꽝(한턴쉬기)",
                "무인도", //10
                "초성게임",
                "황금열쇠", //12 황금열쇠
                "가위바위보", //13
                "일심동체",
                "프리패스",
                "쌩쌩이",
                "판치기",
                "물병세우기"];

var gameCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

window.onload = function () {
    
    var windowWidth = window.innerWidth - 100; //dev
    var windowHeight = window.innerHeight - 100; //dev
//    var windowWidth = window.outerWidth;
//    var windowHeight = window.outerHeight;
    
    $(".toast").css("width",windowWidth/2);
    $(".toast").css("height",windowHeight/3);
    $(".toast").css("margin-left",windowWidth/4);
    $(".toast").css("margin-top",windowHeight/3);
    
    $(".mainTitle").css("width",windowWidth/2);
    $(".mainTitle").css("height",windowHeight/3);
    $(".mainTitle").css("margin-left",windowWidth/4);
    $(".mainTitle").css("margin-top",windowHeight/3);
    
    var layoutWidth = windowWidth/6;
    var layoutheight = windowHeight/5;
    
    $(".layout").css("width",layoutWidth);
    $(".layout").css("height",layoutheight);
    
    $(".button").css("width",layoutWidth/4 -2);
    $(".button").css("height",layoutheight/4 -2);
    
    for(var i=0; i<18; i++){ //초기 Text 설정
        $(".tArea"+(i+1)).text(gameTitle[i]);
    }
    
    for(var i=1; i<=8; i++){ //초기 버튼 색 설정
        $(".btnArea1 .btn"+i).css("background-color",color[i-1]);
    }
};

var selectBtn = function(btnIndex, boxIndex){
    
    if(isToast == false){
        
        console.log("boxIndex = "+boxIndex);
        console.log("btnIndex = "+btnIndex);
        
        toastPopup(boxIndex);
        
        if(gameCount[boxIndex-1] < 2){
            gameCount[boxIndex-1] = gameCount[boxIndex-1] +1;
        }
        
        $(".btn"+btnIndex).css("background-color","rgba(0,0,0,0)");
        $(".btnArea"+boxIndex+" .btn"+btnIndex).css("background-color",color[btnIndex-1]);
//        $(".tArea"+boxIndex).text(game[boxIndex-1][gameCount[boxIndex-1]]); //바꿀필요 없음
    }
}

var toastPopup = function(boxIndex){
    isToast = true;
    
    $(".toast").text(game[boxIndex-1][gameCount[boxIndex-1]]);
    $(".toast").css("display","block");
//    setTimeout(function(){
//        $(".toast").css("display","none");
//        isToast = false;
//    }, 3000);
}

var clickToast = function(){
    $(".toast").css("display","none");
    isToast = false;
}