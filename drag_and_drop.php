<?php
	require "./lib.php";

	//$raw_data = file_get_contents('php://input');
	//$data = base64_decode($raw_data);	//decode the result
	//$file_name = $_SERVER['HTTP_FILE_NAME'];
	//file_put_contents($file_name, $data)
	//Do your work

	$file_name = $_SERVER['HTTP_FILE_NAME'];
	$file_size = $_SERVER{'HTTP_FILE_SIZE'};
	$file_type = $_SERVER{'HTTP_FILE_TYPE'};

	echo "file_name = $file_name, file_size = $file_size, file_type=$file_type"
?>