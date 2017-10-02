<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");

    $result = mysqli_query($con, "DELETE FROM attendance1 WHERE date = '".$postdata."'");

    mysqli_close($con);
?>