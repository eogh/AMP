var isToast = false;

var color = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "white"];

var game = [
    ["출발", "출발", "출발"], //시작
    ["참참참(팀에서 3명) 전원 성공", "참참참(팀에서 4명) 전원 성공", "참참참(팀에서 5명) 전원 성공"], //2
    ["과자 3번 던저서 1번이상 받아먹기 (팀에서 1명)", "과자 3번 던저서 2번이상 받아먹기 (팀에서 1명)", "과자 1번에 받아먹기 (팀에서 1명)"], //3
    ["미션패스권", "미션패스권", "미션패스권"], //4 황금열쇠
    ["티슈 입으로 불어서 30초 동안 안 떨어뜨리기(팀에서 2명)", "티슈 입으로 불어서 30초 동안 안 떨어뜨리기(팀에서 3명)", "티슈 입으로 불어서 30초 동안 안 떨어뜨리기(팀에서 4명)"], //5
    ["전주 듣고 10초 안에 노래제목 맞추기 (팀 전원)", "전주 듣고 7초 안에 노래제목 맞추기 (팀 전원)", "전주 듣고 5초 안에 노래제목 맞추기 (팀 전원)"], //6
    ["책 펴서 사람 인원수 10명 넘기 (팀에서 3명 합계)", "책 펴서 사람 인원수 20명 넘기 (팀에서 3명 합계)", "책 펴서 사람 인원수 30명 넘기 (팀에서 3명 합계)"], //7
    ["다음 턴 주사위x2만큼 전진", "다음 턴 주사위x2만큼 전진", "다음 턴 주사위x2만큼 전진"], //8 황금열쇠
    ["제시어가 나오면 팀원이 다 같은 자세를 취해야 한다.(팀에서 3명)", "제시어가 나오면 팀원이 다 같은 자세를 취해야 한다.(팀에서 4명)", "제시어가 나오면 팀원이 다 같은 자세를 취해야 한다.(팀에서 5명)"], //9
    ["다음 턴 짝수 주사위 나오면 탈출! 안나오면 다음 턴 탈출", "다음 턴 짝수 주사위 나오면 탈출! 안나오면 다음 턴 탈출", "다음 턴 짝수 주사위 나오면 탈출! 안나오면 다음 턴 탈출"], //10 무인도
    ["초성 만들기 10개 이상", "11_2단계", "11_3단계"], //11
    ["다음 턴 주사위+3만큼 전진", "다음 턴 주사위+3만큼 전진", "다음 턴 주사위+3만큼 전진"], //12 황금열쇠
    ["13_1단계", "13_2단계", "13_3단계"], //13
    ["14_1단계", "14_2단계", "14_3단계"], //14
    ["15_1단계", "15_2단계", "15_3단계"], //15
    ["16_1단계", "16_2단계", "16_3단계"], //16
    ["17_1단계", "17_2단계", "17_3단계"], //17
    ["18_1단계", "18_2단계", "18_3단계"]]; //18

var gameTitle = ["출발 =>=>", //시작
                "참참참",
                "과자받기",
                "황금열쇠", //4 황금열쇠
                "티슈날리기",
                "노래맞추기",
                "책게임",
                "황금열쇠", //8 황금열쇠
                "game9",
                "무인도", //10
                "game11",
                "황금열쇠", //12 황금열쇠
                "game13",
                "game14",
                "game15",
                "game16",
                "game17",
                "game18"];

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
        
        if(gameCount[boxIndex-1] < 3){
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