var createMember = function(){

    var Id = document.getElementById("Id").value;
    var Password = document.getElementById("Password").value;
    var Password2 = document.getElementById("Password2").value;
    var Email = document.getElementById("Email").value;
    
    console.log("Data = "+Id+", "+Password+", "+Password2+", "+Email);
    
    
    $.ajax({
        type: "POST",
        url: 'ajax/createMember.php',
        data: {Id: Id, Password: Password, Password2: Password2, Email: Email},
        //data:{Id, Password, Password2, Email},
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(data){
            console.log("Sdata = "+data);
            //location.href="login.html";
        },
        error: function(data){
            alert("정보를 잘못 입력하셨습니다");
            console.log("error : "+data);   
            console.log("errorJSON : "+JSON.stringify(data));
        }
    });
};