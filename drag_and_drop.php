<?php
	require "./lib.php";
	
	$raw_data = file_get_contents('php://input');
	$data = base64_decode($raw_data);	//decode the result
	$file_name = $_SERVER['HTTP_FILE_NAME'];
	file_put_contents($file_name, $data)
	//Do your work
	show();
?>