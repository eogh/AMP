<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $Id = $_POST['Id'];
    $Password = $_POST['Password'];

    $query = "select id, pass, permit from member where id='".$Id."' and pass=password('".$Password."')";
    
    $result = mysqli_query($con, $query);
    
    echo $result->num_rows;

    mysqli_close($con);
?>