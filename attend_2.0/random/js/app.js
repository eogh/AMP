window.onload = function () {
    init();
};

var init = function(){
    
    //초기화
    var people = [];
    var peopleText = "";
    var peoplehtml = '';
    
    var where = ["교회","영화관","공원"];
    var what = ["묵상나눔", "치킨먹기", "기도하기"];
    var how = ["귀엽게", "우울하게", "즐겁게"];
    
    //배열 shuffle
    shuffle(people);
    shuffle(where);
    shuffle(what);
    shuffle(how);
    
    $("#where").text(where[0]);
    $("#what").text(what[0]);
    $("#how").text(how[0]);
    
    //click events
    $("#card0").flip({axis: 'x', trigger: 'click'});
    $("#card1").flip({axis: 'y', trigger: 'click'});
    $("#card2").flip({axis: 'y', trigger: 'click'});
    $("#card3").flip({axis: 'y', trigger: 'click'});
    
    $("#name-add").click(function(){
        
        peoplehtml = '';
        people = [];
        
        console.log($("#name-input").val());
        
        var nameText = $("#name-input").val();
        
        var arr = nameText.split(",");
        
        for(var i=0;i<arr.length;i++){
            people.push(arr[i]);
            peoplehtml += '<div class="name-area-item">'+arr[i]+'</div>';
        }
        
        $("#name-area").html(peoplehtml);
        
        var ss = "";
        for(var s=0;s<people.length;s++){
            ss += people[s]+"\\";
        }
        console.log("peopleArr = "+ss);
    });

    $("#name-close").click(function(){
        
        $("#setup-people").css("display","none");
        
        shuffle(people);
        
        peopleText = "";
        
        if(people.length >=5){
            for(var i=0;i<5;i++){
                peopleText += people[i] + " ";
            }
        }else{
            alert("5명 이상 입력하셔야 합니다");
            peopleText = "5명 이상 입력해 주세요";
        }
        
        $("#people").text(peopleText);
        
        console.log("peopleText = "+peopleText);
    });
    
    $("#setup-icon").click(function(){
        if($("#setup-people").css("display") == "none"){
            $("#setup-people").css("display","block");
        }else{
            $("#setup-people").css("display","none");
        }
    });
    
};

var shuffle = function(array) {
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