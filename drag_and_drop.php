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

	$_temp_dir = $data_dir.$temp_dir.'/'.$file_name;
	$_img_dir = $data_dir.$img_dir.'/'.$file_name;
	$_shortcut_dir = $data_dir.$shortcut_dir.'/'.$file_name;

	file_put_contents($_temp_dir, $data);	//file stores in the _temp dir

	//show();

	$array = array();

	//check file existance
	//$file_exist_flag = check_file_existance($file_name);

	if(!file_exists("$_img_dir")) //file not exists
	{
		if(1000000 >= $file_size) //file size is not larger than 1MB
		{
			//if($file_type != "image/jpeg" && $file_type != "image/jpg" && $file_type != "image/gif" && $file_type != "image/png")
			//not enough since we may change the extension
			$identity = `identify -verbose "$_temp_dir" | grep Format:`;
			$type = explode(" ", $identity)[3]; //very strange, the 4th one is the format of the file
			//echo "identity: ".$identity;
			//echo $type;
			if($type == "JPEG" || $type == "JPG" || $type == "GIF" || $type == "PNG") //file type is correct
			{
				//get the img_width and img_heigh of the original image
				$img_width = `identify -format "%w" "$_temp_dir"`;;
				$img_heigh = `identify -format "%h" "$_temp_dir"`;
				//generate shortcut
				`convert "$_temp_dir" -resize 100x100 "$_shortcut_dir"`;
				//move to _img dir
				`cp "$_temp_dir" "$_img_dir"`;
				//add record into database
				$mysql_error = add_file_record($file_name, $file_size, $_img_dir, $_shortcut_dir, $img_width, $img_heigh);
				if($mysql_error) //not null, error
				{
					$array['mysql_error'] = "$mysql_error";
				}
			}
			else //file type is not supported
			{
				$file_type_flag = "File should be jpeg/jpg/png/gif.";
				$array['file_type_flag'] = "$file_type_flag";
			}
		}
		else
		{
			$file_size_flag = "File size too large. Should be less than 1MB.";
			$array['file_size_flag'] = "$file_size_flag";
		}

	}
	else //file exists, just overwrite it
	{
		$file_exist_flag = "File overwrited.";
		$array['file_exist_flag'] = "$file_exist_flag";

		if(1000000 >= $file_size)
		{
			$identity = `identify -verbose "$_temp_dir" | grep Format:`;
			$type = explode(" ", $identity)[3];

			if($type == "JPEG" || $type == "JPG" || $type == "GIF" || $type == "PNG") //file type is correct
			{
				//generate shortcut
				`convert "$_temp_dir" -resize 100x100 "$_shortcut_dir"`;
				//move to _img dir
				`cp "$_temp_dir" "$_img_dir"`;
				//delete old record
				$mysql_error = delete_file_record($file_name);
				//add record into database
				$mysql_error .= add_file_record($file_name, $file_size, $_img_dir, $_shortcut_dir);
				if($mysql_error) //not null, error
				{
					$array['mysql_error'] = "$mysql_error";
				}
			}
			else
			{
				$file_type_flag = "File should be jpeg/jpg/png/gif.";
				$array['file_type_flag'] = "$file_type_flag";
			}
		}
		else
		{
			$file_size_flag = "File size too large. Should be less than 1MB.";
			$array['file_size_flag'] = "$file_size_flag";
		}
	}

	`rm -f "$_temp_dir"`; //remove file in temp

	$array['file_name'] = "$file_name";

	$response = json_encode($array);
	echo ($response);

	//show();
?>