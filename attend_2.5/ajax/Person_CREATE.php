<?php
    $con = mysqli_connect("localhost", "daeho1909", "wheogh357912", "daeho1909");

    if(mysqli_connect_errno($con)){
        echo "Failed to connect to MySQL : " . mysqli_connect_error();
    }
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

//	$query="INSERT INTO peoplem (id, name, gender, age, part, group, isAttend, created)
//			VALUES ('190101_조대호', '조대호', 1, 90, '모두공동체', '대호마을', 1, '2019-01-01');";

//			VALUES ('".$request->id."', '".$request->name."', '".$request->gender."', '".$request->age."', '".$request->part."', '".$request->group."', '1', '".$request->created."')";
    
//	$query="INSERT INTO peoplem SET 
//			id='".$request->id."'
//			name='".$request->name."'
//			gender='".$request->gender."'
//			age='".$request->age."'
//			part='".$request->part."'
//			group='".$request->group."'
//			isAttend='".$request->isAttend."'
//			created='".$request->created."'";
	
//	$query="INSERT INTO peoplem (id, name, gender, age, part, group, isAttend, created) VALUES ('190117_조대호', '조대호', '1', '90', '모두공동체', '대호마을', '1', '2019-01-17')";
	$query="INSERT INTO peoplem (id, name, gender, age, part, group, isAttend, created) VALUES ('190119_조대호', '조대호', '1', '91', '모두공동체', '대호마을', '1', '2019-01-18')";

//	$query="INSERT INTO attend_2019 (id, part, check1, check2, date) VALUES ('190117_조대호','모두공동체','0','0','2019-01-17')";
		
	
    if (mysqli_query($con, $query)) {
    	echo "New record created successfully";
	} else {
    	echo mysqli_error($con);
	}

    mysqli_close($con);
?>