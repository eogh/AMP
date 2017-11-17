var isToast = false;

var color = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "white"];

var game = [
    ["출발", "출발", "출발"],
    ["2_1단계", "2_2단계", "2_3단계"],
    ["3_1단계", "3_2단계", "3_3단계"],
    ["4_1단계", "4_2단계", "4_3단계"],
    ["5_1단계", "5_2단계", "5_3단계"],
    ["6_1단계", "6_2단계", "6_3단계"],
    ["7_1단계", "7_2단계", "7_3단계"],
    ["8_1단계", "8_2단계", "8_3단계"],
    ["9_1단계", "9_2단계", "9_3단계"],
    ["10_1단계", "10_2단계", "10_3단계"],
    ["11_1단계", "11_2단계", "11_3단계"],
    ["12_1단계", "12_2단계", "12_3단계"],
    ["13_1단계", "13_2단계", "13_3단계"],
    ["14_1단계", "14_2단계", "14_3단계"],
    ["15_1단계", "15_2단계", "15_3단계"],
    ["16_1단계", "16_2단계", "16_3단계"],
    ["17_1단계", "17_2단계", "17_3단계"],
    ["18_1단계", "18_2단계", "18_3단계"]];

var gameCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

window.onload = function () {
    
    var windowWidth = window.innerWidth; //dev
    var windowHeight = window.innerHeight; //dev
//    var windowWidth = window.outerWidth;
//    var windowHeight = window.outerHeight;
    
    $(".toast").css("width",windowWidth/2);
    $(".toast").css("height",windowHeight/2);
    $(".toast").css("margin-left",windowWidth/4);
    $(".toast").css("margin-top",windowHeight/4);
    
    var layoutWidth = windowWidth/6;
    var layoutheight = windowHeight/5;
    
    $(".layout").css("width",layoutWidth);
    $(".layout").css("height",layoutheight);
    
    $(".button").css("width",layoutWidth/4);
    $(".button").css("height",layoutheight/4);
    
    for(var i=0; i<18; i++){ //초기 Text 설정
        $(".tArea"+(i+1)).text(game[i][0]);
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
        $(".tArea"+boxIndex).text(game[boxIndex-1][gameCount[boxIndex-1]]);
    }
}

var toastPopup = function(boxIndex){
    isToast = true;
    
    $(".toast").text(game[boxIndex-1][gameCount[boxIndex-1]]);
    $(".toast").css("display","block");
    setTimeout(function(){
        $(".toast").css("display","none");
        isToast = false;
    }, 3000);
}