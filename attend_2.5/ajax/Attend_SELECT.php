<?php
    $con = mysqli_connect("localhost", "daeho1909", "Chlwldo3314", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $postObj = json_decode($postdata);

    $day = $postObj->day;
    $part = $postObj->part;
    
    $result = mysqli_query($con, "select * FROM people_2020 AS p LEFT JOIN attend_2020 AS a ON p.id = a.id WHERE a.date = '".$day."' and a.part= '".$part."' ORDER BY p.group");

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $arr[] = $row;
        }
    }

    echo $json = json_encode($arr);

    mysqli_close($con);
?>