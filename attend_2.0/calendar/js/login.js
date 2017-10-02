var login = function(){
    
    var Id = document.getElementById("Id").value;
    var Password = document.getElementById("Password").value;
    
    console.log("Id :"+Id+" Password :"+Password);
    
    $.ajax({
        type: "POST",
        url: 'ajax/login.php',
        data: {Id: Id, Password: Password},
        //data:{Id, Password, Password2, Email},
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(data){
            console.log("Sdata = "+data);
            if(data === "1"){
                location.href="index.html";
            }else{
                alert("비밀번호가 잘못 되었습니다");
            }
        },
        error: function(data){
            console.log("error : "+data);   
            console.log("errorJSON : "+JSON.stringify(data));
        }
    });
};