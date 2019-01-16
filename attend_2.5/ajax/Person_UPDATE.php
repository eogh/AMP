<?php
    $con = mysqli_connect("localhost", "root", "111111", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

	$query="INSERT INTO peoplem (id, name, gender, age, part, group, isAttend, created) VALUES ('".$request->id."', '".$request->name."', '".$request->gender."', '".$request->age."', '".$request->part."', '".$request->group."', '1', '".$request->created."');";
        
    mysqli_query($con, $query);

    echo $query;

    mysqli_close($con);
?>