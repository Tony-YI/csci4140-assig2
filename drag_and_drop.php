<?php
	require "./lib.php";

	header("Content-type: text/json");

	$file_name = $_SERVER['HTTP_FILE_NAME'];
	$file_size = $_SERVER{'HTTP_FILE_SIZE'};
	$file_type = $_SERVER{'HTTP_FILE_TYPE'};

	//store the data to the _temp dir
	global $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	$raw_data = file_get_contents('php://input');
	$data = base64_decode($raw_data);	//decode the result
	$file_dir = $data_dir.$temp_dir;
	file_put_contents($file_dir, $data)

	show();

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
	//if($file_type != "image/jpeg" && $file_type != "image/jpg" && $file_type != "image/gif" && $file_type != "image/png")
	//not enough since we may change the extension
	if()
	{
		$file_type_flag = "File should be jpeg/jpg/png/gif.";
		$array['file_type_flag'] = "$file_type_flag";
	}

	$response = json_encode($array);
	echo ($response);
?>