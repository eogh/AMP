<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $postObj = json_decode($postdata);

    $day = $postObj->day;
    $part = $postObj->part;
    
    //$result = mysqli_query($con, "select date FROM attendance GROUP BY date");
    //$result = mysqli_query($con, "select * FROM attendance WHERE date = '".$postdata."'");
    $result = mysqli_query($con, "select * FROM people AS p LEFT JOIN attendance".$part." AS a ON p.id = a.id WHERE a.date = '".$day."' ORDER BY p.group");

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $arr[] = $row;
        }
    }

    echo $json = json_encode($arr);

    mysqli_close($con);
?>