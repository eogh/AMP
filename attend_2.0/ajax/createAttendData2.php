<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    if(isset($_GET['tasks'])){
        $tasks = $_GET['tasks'];
    }
    
    $query.= "INSERT INTO attendance2 (id, check1, check2, date) VALUES "; 
        
    for($idx = 1; $idx <= $tasks ; $idx++){
        $query.="(".$idx.','."0".","."0".","."now()".")";
        
        if($idx != $tasks){
            $query.=",";
        }
    }

    mysqli_query($con, $query);

    echo $query;

    mysqli_close($con);
?>