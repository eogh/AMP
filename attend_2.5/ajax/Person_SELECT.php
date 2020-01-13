<?php
    $con = mysqli_connect("localhost", "daeho1909", "Chlwldo3314", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");

    $result = mysqli_query($con, "select * FROM people_2020  WHERE name LIKE '%".$postdata."%'");

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $arr[] = $row;
        }
    }

    echo $json = json_encode($arr);

    mysqli_close($con);
?>