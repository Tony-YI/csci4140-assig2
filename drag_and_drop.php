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

	$str = "{";

	if($file_name)
	{
		$str = $str.'file_name:'.$file_name;
	}
	if($file_size > 1000000)
	{
		$file_size_flag = "File size too large. Should be less than 1MB.";
		$str = $str.',file_size_flag:'.$file_size_flag;
	}
	if($file_type != "image/jpeg" && $file_type != "image/jpg" && $file_type != "image/gif" && $file_type != "image/png")
	{
		$file_size_flag = "File should be jpeg/jpg/png/gif.";
		$str = $str.',file_type_flag:'.$file_type_flag;
	}

	$str = $str."}";

	$str2 = "{\"file_name\":\"1.jpg\"}";
	$response = json_decode($str2);
	print_r($response);
?>