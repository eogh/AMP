<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	
	//group는 sql문에서 사용하는 명령어와 겹치므로 ``묶음(2019.1.21)
	$query="INSERT INTO peopleM SET 
			id='".$request->id."'
			name='".$request->name."'
			gender='".$request->gender."'
			age='".$request->age."'
			part='".$request->part."'
			`group`='".$request->group."'
			isAttend='".$request->isAttend."'
			created='".$request->created."'";


    if (mysqli_query($con, $query)) {
    	echo "New record created successfully";
	} else {
    	echo mysqli_error($con);
	}

    mysqli_close($con);
?>