<?php
	require "./lib.php";

	header("Content-type: text/json");

	$file_name = $_SERVER['HTTP_FILE_NAME'];
	$img_des = $_SERVER['HTTP_IMG_DES'];

	$array = array(); //xhr response array

	global $data_dir, $img_dir, $shortcut_dir, $temp_dir;
	$_img_dir = $data_dir.$img_dir.'/'.$file_name;

	if(!file_exists("$_img_dir")) //file not exist
	{
		//it looks like this is impossible to happen
		$mysql_error = "File not exist.";
	}
	else //file exists
	{
		$mysql_error = modify_file_desc($file_name, $img_des);
	}

	$array['mysql_error'] = $mysql_error;
	$array['file_name'] = "$file_name";

	$response = json_encode($array);
	echo ($response);
?>