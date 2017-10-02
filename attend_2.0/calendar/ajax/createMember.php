<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $Id = $_POST['Id'];
    $Password = $_POST['Password'];
    $Password2 = $_POST['Password2'];
    $Email = $_POST['Email'];
    $date = date('Y-m-d');
    
    if($Password != $Password2){
        //예외처리
    }

    $query = "insert into member values ('".$Id."', password('".$Password."'), '".$Email."', '".$date."', 1)";
    //$query="UPDATE attendance1 SET check1='".$request[$idx]->check1."', check2='".$request[$idx]->check2."' WHERE id='".$request[$idx]->id."'AND date='".$request[$idx]->date."';";
    $result = mysqli_query($con, $query);

    echo $result;

    mysqli_close($con);
?>