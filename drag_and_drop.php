<?php
	require "./lib.php";

	header("Content-type: text/json");
	//$raw_data = file_get_contents('php://input');
	//$data = base64_decode($raw_data);	//decode the result
	//$file_name = $_SERVER['HTTP_FILE_NAME'];
	//file_put_contents($file_name, $data)
	//Do your work

	$file_name = $_SERVER['HTTP_FILE_NAME'];
	$file_size = $_SERVER{'HTTP_FILE_SIZE'};
	$file_type = $_SERVER{'HTTP_FILE_TYPE'};

	$array = array();

	if($file_name)
	{
		$array['file_name'] = "$file_name";
	}
	if(1000000 < $file_size)
	{
		$file_size_flag = "File size too large. Should be less than 1MB.";
		$array['file_size_flag'] = "$file_size_flag";
	}
	if($file_type != "image/jpeg" && $file_type != "image/jpg" && $file_type != "image/gif" && $file_type != "image/png")
	{
		$file_type_flag = "File should be jpeg/jpg/png/gif.";
		$array['file_type_flag'] = "$file_type_flag";
	}

	$response = json_encode($array);
	//echo ($response);

	$haha = array();
	$haha['file_name'] = "1";
	$haha['file_size_flag'] = "2";
	$haha['file_type_flag'] = "3";
	$haha['mysql_error'] = "4";
	$response1 = json_encode($haha);
	echo ($response1);
?>