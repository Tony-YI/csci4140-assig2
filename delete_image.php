<?php
	require "./lib.php";

	global $repo_dir, $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	header("Content-type: text/json");

	$file_name = $_SERVER['HTTP_FILE_NAME'];

	$array = array(); //xhr response array

	$_img_dir = $data_dir.$img_dir.'/'.$file_name;

	if(!file_exists("$_img_dir")) //file not exist
	{
		//it looks like this is impossible to happen
		$mysql_error = "File not exist.";
	}
	else //file exists
	{
		$mysql_error = delete_file_record($file_name);
		$_img_dir = $data_dir.$img_dir.'/'.$file_name;
		$_shortcut_dir = $data_dir.$shortcut_dir.'/'.$file_name;
		`rm -f "$_img_dir" && rm -f "$_shortcut_dir"`;
	}

	$array['mysql_error'] = $mysql_error;
	$array['file_name'] = "$file_name";

	$response = json_encode($array);
	echo ($response);
?>