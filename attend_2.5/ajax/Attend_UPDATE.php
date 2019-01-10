<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    for($idx = 0; $idx < count($request); $idx++){
        
        $query="UPDATE attend_2019 SET part='".$request[$idx]->part."', check1='".$request[$idx]->check1."', check2='".$request[$idx]->check2."' WHERE id='".$request[$idx]->id."' and date='".$request[$idx]->date."';";
        
        mysqli_query($con, $query);
    }

    echo $query;

    mysqli_close($con);
?>