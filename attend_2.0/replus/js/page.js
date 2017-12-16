window.onload = function () {
    this.makeEmotionList();
    this.makeDesireList();
    
	this.showScreen("coldStart"); //처음진입시 coldstart 화면 3초 유지
	setTimeout(function() {
		this.showScreen("mainView");
		
	},300);
};


var list = {
    emotion : ["마비가 된 듯한, 경직된","언짢은","억울한","뒤숭숭한","거북스러운","뭉클한","피곤한","흥분되는","긴장된","지겨운","놀란",
			   "답답한","슬픈","흐뭇한, 흡족한","서운한, 섭섭한","안도감이 드는","든든한","긴장이 풀리는, 진정되는","안타까운",
			   "후회되는","개운한","자랑스러운","희망에 찬, 기대에 부푼","고요한, 평온한","압도된","초조한, 안절부절하는","그리운",
			   "비참한","황홀한, 무아지경의","기운이 빠지는, 맥 빠진","외로운","기운이 나는, 원기왕성한","홀가분한","다정한","짜증나는",
			   "위축된","감격스런, 벅찬","조급한","고통스러운","두려운, 겁나는","무기력한","뿌듯한","암담한, 막막한","반가운",
			   "마음이 넓어지는, 너그러워지는","좌절스러운","냉랭한","산뜻한","매료된","짜릿한","신나는, 즐거운","용기가 나는",
			   "허전한, 공허한","당혹스러운","느긋한","실망한, 낙담한","기쁜","호기심이 드는, 궁금한","유쾌, 통쾌한","혼란스러운",
			   "걱정, 근심스러운","편안한","귀찮은","지루한","행복한","얼떨떨한","수줍은, 부끄러운","고마운, 감사한","불안한",
			   "성난, 격노한","화가 난","생기가 도는","분개한","지친","아쉬운","후련한"], //76개
	
    desire : ["가르침","감사, 인정","개성","건강, 웰빙","경제적 안정","공감, 연민","공기, 음식, 주거","공유","공정","관심","균형",
			  "기여, 나눔","깨달음, 자각","능력, 자신감","도움","도전","돌봄(자기, 상대)","명료함, 투명성","목적, 목표","배려, 헤아림",
			  "배움, 성장","보람, 의미","보호(자기, 상대)","비전, 꿈, 희망","사랑, 우정","상호성, 상호의존","생산","선택","성실성",
			  "성적표현","성취","소속감, 공동체","소통","수용","숙달, 전문성","협력, 지지","신뢰","신체적 안전","신체적 접촉, 스킨십",
			  "아름다움","안심, 안도","애착형성","여유, 홀가분함","연결, 유대","영감, 창조성","영성, 영적교감","예측가능성","위로, 위안",
			  "유연성","이해","인생예찬(축하, 애도)","일관성, 일치","자극, 발견","자기표현","자유, 자율성","자유로운 움직임, 운동",
			  "재미, 놀이","정서적 안정","정의","정직, 진실","존엄성","존재감, 중요하게 여겨짐","존중","주관을 가짐, 자립","진정성",
			  "질서, 조화","참여","책무, 책임, 의무","치유, 회복","친밀함","평등","평화","혼자만의 시간","확신","효율성","휴식, 수면"], //76개
    result : [],
    div : []
}
var _pageHistory = "";


var makeEmotionList = function() {

    var emotionDiv = "";
    
    console.log("list.emotion.length = "+this.list.emotion.length);
    for(var i=0; i < this.list.emotion.length; i++) {
        emotionDiv += '<div class="col-xs-12 elist" id="elist_'+i+'" onclick="selectItem(\'' +  this.list.emotion[i] + '\', \'' + 'elist_' + i + '\')">'+this.list.emotion[i]+'</div>';
    }
    
    $("#emotionList").append(emotionDiv);
}

var makeDesireList = function() {
    
    var desireDiv = "";
    
    console.log("list.desire.length = "+this.list.desire.length);
    for(var i=0; i < this.list.desire.length; i++) {
        desireDiv += '<div class="col-xs-12 dlist" id="dlist_'+i+'" onclick="selectItem(\'' +  this.list.desire[i] + '\', \'' + 'dlist_' + i + '\')">'+this.list.desire[i]+'</div>';
    }
    
    $("#desireList").append(desireDiv);
}

var makeResultList = function() {
    
    var resultDiv = "";
    
    console.log("list.result.length = "+this.list.result.length);
    console.log("list.result = "+JSON.stringify(this.list.result));
    for(var i=0; i < this.list.result.length; i++) {        
        resultDiv += '<div class="col-xs-6 col-md-3 cardHeight"><div class="rlist">'+this.list.result[i]+'</div></div>';
    }
    
    $("#resultList").append(resultDiv);
    
    $(".cardHeight").css("height","331px");
    $(".rlist").css("line-height","331px");
    
    //초기화
    this.list.result = [];
    console.log("list.div.length = "+this.list.div.length);
    for(var i=0; i<this.list.div.length; i++) {
        console.log("list.div[i] = "+this.list.div[i]);
        $("#"+this.list.div[i]).removeClass("list-press");
    }
    this.list.div = [];
}

var selectItem = function(item, div) {
    
    console.log("select Item = "+item);
    console.log("select div = "+div);
    
    if($("#"+div).hasClass("list-press")) //선택 해제
    {
        this.list.result.splice(this.list.result.indexOf(item),1); //배열에서 삭제
        this.list.div.splice(this.list.div.indexOf(div),1); //배열에서 삭제
        $("#"+div).removeClass("list-press");
    } 
    else //선택 되었을 때
    { 
        if(list.result.length < 4) {
            this.list.result.push(item); //배열에 추가
            this.list.div.push(div); //배열에 추가
            $("#"+div).addClass("list-press");
        } else {
            console.log("no more select Item");
            
        }
        
    }
    console.log("list.result = "+JSON.stringify(this.list.result));
    console.log("list.div = "+JSON.stringify(this.list.div));
}

var goResultView = function() {
	
	if(this.list.result.length >= 1){ //한개라도 선택 한 경우
		this.showScreen('resultView');
	} else {
		alert("한개 이상 선택해주세요~");
	}
	
}

var backResultView = function() {
	
	this.showScreen(this._pageHistory);
}

var showScreen = function(screen) {
    $("#mainView").css("display","none");
    $("#desireView").css("display","none");
    $("#emotionView").css("display","none");
    $("#resultView").css("display","none");
    $("#coldStart").css("display","none");
    
    $("#"+screen).css("display","block");
    
    if(screen == "resultView") {
        this.makeResultList();
    } else {
        $("#resultList").empty(); //back시에만 해주는 것으로 바꾸기
    }
	
	if(screen == "emotionView") {
		this._pageHistory = "emotionView";
	} else if(screen == "desireView") {
		this._pageHistory = "desireView";
	}
}