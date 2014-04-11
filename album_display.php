<?php
	require './lib.php';

	global $repo_dir, $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	header("Content-type: text/json");

	$array = array(); //xhr response array

	//quert the database
	$query = "SELECT * FROM file ORDER BY upload_time DESC;";
	$result = db_execute($query);

	if($result == null) //mysql errer
	{
		$array['mysql_error'] = "ERROR when displaying images.";
	}
	else
	{
		$count = 0;
		while($row = $result->fetch())
		{
			$ln_shortcut_path = './data/'.$shortcut_dir.'/'.$row['file_name'];
			$ln_img_path = './data/'.$img_dir.'/'.$row['file_name'];

			$row['shortcut_path'] = $ln_shortcut_path;
			$row['img_path'] = $ln_img_path;

			$array[$count]['file_name'] = $row['file_name'];
			$array[$count]['file_size'] = $row['file_size'];
			$array[$count]['upload_time'] = $row['upload_time'];
			$array[$count]['img_description'] = $row['img_description'];
			$array[$count]['img_path'] = $row['img_path'];
			$array[$count]['shortcut_path'] = $row['shortcut_path'];
			$array[$count]['img_width'] = $row['img_width'];
			$array[$count]['img_height'] = $row['img_height'];

			$count++;
		}
	}

	//print_r($array);
	$response = json_encode($array);
	echo $response;
?>