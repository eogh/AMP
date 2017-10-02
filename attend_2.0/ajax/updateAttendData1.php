<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    for($idx = 0; $idx < count($request); $idx++){
        //echo $request[$idx]->id;
        //$query.="UPDATE attendance SET check1=".$request[$idx]->check1.", check2=1, date=".$request[$idx]->date." WHERE id=".$request[$idx]->id.";";
        $query="UPDATE attendance1 SET check1='".$request[$idx]->check1."', check2='".$request[$idx]->check2."' WHERE id='".$request[$idx]->id."'AND date='".$request[$idx]->date."';";
        mysqli_query($con, $query);
    }

    echo $query;

    mysqli_close($con);
?>