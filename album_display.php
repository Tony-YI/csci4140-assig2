<?php
	require './lib.php';

	global $repo_dir, $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	header("Content-type: text/json");

	//quert the database
	$query = "SELECT * FROM file ORDER BY upload_time DESC;";

	$array = array(); //xhr response array

	$result = db_execute($query);

	if($result == null) //mysql errer
	{

		$array['mysql_error()'] = "ERROR when displaying images.";
	}
	else
	{
		$array = $result; //xhr response
	}

	while($row = $result->fetch())
	{
		$array[] = $row;
	}

	print_r($array);
	//$response = json_encode($array);
	//echo $response;
?>