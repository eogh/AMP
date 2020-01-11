<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $postObj = json_decode($postdata);

    $day = $postObj->day;
    $part = $postObj->part;
    
//    $result = mysqli_query($con, "select * FROM people AS p LEFT JOIN attendance".$part." AS a ON p.id = a.id WHERE a.date = '".$day."' ORDER BY p.group");

    $result = mysqli_query($con, "select id FROM people_2020 WHERE part ='".$part."' ORDER BY id ASC");

    $query.= "INSERT INTO attend_2020 (id, part, check1, check2, date) VALUES "; 

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
//            $arr[] = $row;
            $query.="('".$row[id]."', '".$part."', "."0".", "."0".", '".$day."'),";
        }
    }

    $query = substr($query, 0, -1); //맨 마지막 , 잘라내기

    mysqli_query($con, $query);

//    echo $json = json_encode($arr);

    echo $query;

    mysqli_close($con);
?>