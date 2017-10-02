var tempVal = 0;
var arr = [];
var hArr = [];

for(var j=0;j<25;j++)
{
    arr[j] = "";
    hArr[j] = "";
}
    
arr[24] = "MAX";
hArr[20] = "목사님자유이용권";
arr[18] = "전체간식";
hArr[15] = "영화티켓2장";
hArr[10] = "굽네볼케이노";
hArr[5] = "베스킨라빈스3명";

window.onload = function () {
    
    var valueHtml = "";
    var goalHtml ="";
    for(var i=24;i>=0;i--){
        valueHtml+="<div class='num' id='num_"+i+"'>"+i*10+"도</div>";
        goalHtml+="<div class='text' id='text_"+i+"'>"+arr[i]+"</div>";
    }
    $("#value").append(valueHtml);
    $("#goal").append(goalHtml);
    
    $("#num_0").css("background-color","rgba(255,0,0,0.5)");
    $("#text_0").css("background-color","rgba(255,0,0,0.5)");
};

var tempPlus = function(value){
    
    if(tempVal < 240){
        tempVal += value;
    }else{
        alert("100%");
    }
    
    if(tempVal%10 === 0){
        if(tempVal != 180 && tempVal != 240){
            $("#text_"+tempVal/10).text(hArr[tempVal/10]);
        }
        $("#num_"+tempVal/10).css("background-color","rgba(255,0,0,0.5)");
        $("#text_"+tempVal/10).css("background-color","rgba(255,0,0,0.5)");
    }
    
    console.log("tempVal = "+tempVal);
    
    
    $("#temp-body").css("height",(720-tempVal*3)+"px");
    $("#temp-bar").css("margin-top",(790-tempVal*3)+"px");
    $("#temp-value").text(tempVal);
};