<?php
	require './lib.php';

	global $repo_dir, $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	header("Content-type: text/json");

	$query = "";
	$result = "";
	$array = array(); //xhr response array

	$query = "SELECT * FROM update_status;";
	$result = db_execute($query);
	if($result != NULL)
	{
		$last_update_time = $result->fetch();
	}

	$query = "SELECT upload_time FROM file ORDER BY upload_time DESC;";
	$result = db_execute($query);
	if($result != NULL)
	{
		$current_update_time = $result->fetch();
	}

	//chech whether there is new image or not
	if($last_update_time < $current_update_time) //new images exist
	{
		//quert the database
		$query = "SELECT * FROM file ORDER BY upload_time DESC;";
		$result = db_execute($query);

		if($result == null) //mysql errer
		{
			$array['mysql_error'] = "ERROR when displaying images.";
		}
		else
		{
			while($row = $result->fetch())
			{
				$ln_shortcut_path = './data/'.$shortcut_dir.'/'.$row['file_name'];
				$ln_img_path = './data/'.$img_dir.'/'.$row['file_name'];

				$row['shortcut_path'] = $ln_shortcut_path;
				$row['img_path'] = $ln_img_path;
				$array[] = $row;
			}
		}
	}
	else
	{
		//do nothing
		$array['update_status'] = "No new image exists.";
	}

	//print_r($array);
	$response = json_encode($array);
	echo $response;
?>