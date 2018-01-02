<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    for($idx = 0; $idx < count($request); $idx++){

        $result = mysqli_query($con, "select * FROM attend_2018 WHERE id='".$request[$idx]->id."' and date='".$request[$idx]->date."'"); //날짜 계산에 대한 플로우가 잘 정리되어야 한다. 아직 정상동작X
        
        if($result->num_rows >= 1) { //데이터가 있는 경우는 update
            $query="UPDATE attend_2018 SET part='".$request[$idx]->part."', check1='".$request[$idx]->check1."', check2='".$request[$idx]->check2."' WHERE id='".$request[$idx]->id."' and date='".$request[$idx]->date."';";
        } else { //없는 경우는 insert
            $query="INSERT INTO attend_2018 (id, part, check1, check2, date) VALUES ('".$request[$idx]->id."', '".$request[$idx]->part."', '".$request[$idx]->check1."', '".$request[$idx]->check2."', "."now()".");";
        }
        mysqli_query($con, $query);
    }

    echo $query;

    mysqli_close($con);
?>