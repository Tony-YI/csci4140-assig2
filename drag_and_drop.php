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
	$file_dir = $data_dir.'/'.$temp_dir.'/'.$file_name;
	file_put_contents($file_dir, $data);	//file stores in the _temp dir

	show();

	//check the file avaliability
	//move it to the destination when avaliable
	//add a record in the database when avaliable
	$array = array();

	if($file_name) //file name is avaliable
	{
		$array['file_name'] = "$file_name";

		if(1000000 >= $file_size) //file size is not larger than 1MB
		{
			//if($file_type != "image/jpeg" && $file_type != "image/jpg" && $file_type != "image/gif" && $file_type != "image/png")
			//not enough since we may change the extension
			$identity = `identify -verbose "$file_dir" | grep Format:`;
			$type = explode(" ", $identity)[3]; //very strange, the 4th one is the format of the file
			//echo "identity: ".$identity;
			//echo $type;
			if($type == "JPEG" || $type == "JPG" || $type == "GIF" || $type == "PNG") //file type is correct
			{
				//TODO:
				//chech file existance
				//generate shortcut
				//move to _img dir
				//add record into database

				//TPDO: remove file in _temp dir
			}
			else //file type is not supported
			{
				$file_type_flag = "File should be jpeg/jpg/png/gif.";
				$array['file_type_flag'] = "$file_type_flag";
				//TODO: remove file in temp
			}
		}
		else
		{
			$file_size_flag = "File size too large. Should be less than 1MB.";
			$array['file_size_flag'] = "$file_size_flag";

			//TODO: remove file in temp
		}
	}
	else
	{
		//TODO: remove file in temp
	}

	`rm -rf $file_dir`;

	$response = json_encode($array);
	echo ($response);
?>