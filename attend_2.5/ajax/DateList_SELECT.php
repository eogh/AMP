<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");

    $result = mysqli_query($con, "select date FROM attend_2019 WHERE part ='".$postdata."' GROUP BY date");

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $arr[] = $row;
        }
    }

    echo $json = json_encode($arr);

    mysqli_close($con);
?>