<?php
/********************************
This is a .PHP file for CSCI4140 assignment 2.
In this file, all the php function call is inclued.
*********************************/

/********************************************/
/********Setup DataBase (PHP-MYSQL)**********/
/********************************************/
$db_host = $_ENV{'OPENSHIFT_MYSQL_DB_HOST'};
$db_username = $_ENV{'OPENSHIFT_MYSQL_DB_USERNAME'};
$db_password = $_ENV{'OPENSHIFT_MYSQL_DB_PASSWORD'};
$db_name = $_ENV{'OPENSHIFT_APP_NAME'};

function create_db()
{
	global $db_host, $db_name, $db_username, $db_password;
	//$dbh = new PDO('mysql:host=localhost;dbname=test', $username, $password);
	$db_source = "mysql:host=$db_host;";

	try
	{
		$db_obj = new PDO($db_source, $db_username, $db_password);

		$db_obj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		//$query = $dbh->prepare(“UPDATE client SET pass=‘cool’ WHERE  user=‘tywong’”);
		$query1 = $db_obj->prepare("CREATE DATABASE $db_name;");
		$query1->execute();

		$query2 = $db_obj->prepare("SET GLOBAL time_zone = '+8:00';");
		$query2->execute();
	}
	catch(PDOException $e)
	{
		echo "$e";
	}
	$db_obj = NULL;
}

function drop_db()
{
	global $db_host, $db_name, $db_username, $db_password;
	$db_source = "mysql:host=$db_host;";

	try
	{
		$db_obj = new PDO($db_source, $db_username, $db_password);

		$db_obj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$query = $db_obj->prepare("DROP DATABASE $db_name;");
		$query->execute();
	}
	catch(PDOException $e)
	{
		echo "$e";
	}

	$db_obj = NULL;
}

function create_table()
{
	global $db_host, $db_name, $db_username, $db_password;
	$db_source = "mysql:host=$db_host;dbname=$db_name";

	try
	{
		$db_obj = new PDO($db_source, $db_username, $db_password);
		
		$db_obj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$query = $db_obj->prepare("CREATE TABLE file (file_name CHAR(255), file_size INT, upload_time TIMESTAMP, img_description CHAR(255), img_path CHAR(255), shortcut_path CHAR(255), PRIMARY KEY(file_name));");
		$query->execute();
	}
	catch(PDOException $e)
	{
		echo "$e";
	}
	$db_obj = NULL;
}

function db_execute($query)
{
	global $db_host, $db_name, $db_username, $db_password;
	$db_source = "mysql:host=$db_host;dbname=$db_name";

	try
	{
		$db_obj = new PDO($db_source, $db_username, $db_password);
		
		$db_obj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$q = $db_obj->prepare($query);
		$q->execute();
		$db_obj = NULL;
		return $q;
	}
	catch(PDOException $e)
	{
		echo "$e";
	}
}
/********************************************/

/********************************************/
/***********Setup Permanent Storage**********/
/********************************************/
$data_dir = $_ENV{"OPENSHIFT_DATA_DIR"};
$img_dir = "_img";
$shortcut_dir = "_shortcut";
$temp_dir = "_temp";

function show_dir()
{
	global $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	try
	{
		$result = `cd "$data_dir" && ls -a`;
		echo "$result";
	}
	catch(Exception $e)
	{
		echo "$e";
	}
}

function init_storage()
{
	global $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	try
	{
		$result = `cd "$data_dir" && mkdir "$temp_dir" && mkdir "$img_dir" && mkdir "$shortcut_dir"`;
		echo "$result";
		show_dir();
	}
	catch(Exception $e)
	{
		echo "$e";
	}
}

function clean_storage()
{
	global $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	try
	{
		$result = `cd "$data_dir" && rm -rf "$temp_dir" && rm -rf "$img_dir" && rm -rf "$shortcut_dir" `;
		echo "$result";
		show_dir();
	}
	catch(Exception $e)
	{
		echo "$e";
	}
}

/********************************************/
/************Setup Upload/Delete*************/
/********************************************/
function check_file_existance($file_name)
{
	$query = "SELECT COUNT(*) FROM file WHERE file_name='$file_name';";
	$result = db_execute($query);

	//$result = $result->fetch(); //result is an array, a row

	print_r($result);
	//Array
	//(
    //[COUNT(*)] => 0
    //[0] => 0
	//)

/*
	if($result->fetch())[COUNT(*)] != 0)
	{
		return "File already exist.";
	}
	else //file not exist
	{
		return NULL;
	}
*/
}

function add_file_record($file_name, $file_size, $_img_dir, $_shortcut_dir)
{
	$query = "INSERT INTO file (file_name, file_size, upload_time, img_description, img_path, shortcut_path) VALUES ('$file_name', '$file_size', CURRENT_TIMESTAMP, '', '$_img_dir', '$_shortcut_dir');";
	db_execute($query, $q);
}

function delete_file_record($file_name)
{
	//$query = ";";
	//db_execute($query, $q);
}

function modify_file_desc($file_name, $file_desc)
{
	//$query = ";";
	//db_execute($query, $q);
}
/********************************************/

/********************************************/
/***********Setup Album Display**************/
/********************************************/
#since the photos are store in the presistent storage
#are not accessable by the browser.
#we must create a symbolic link of the presisten dir
#so that we can get back the photo using browser

#add file "deploy" in [project_name]/.openshift/action_hooks/
#the file name must be "deploy"
#add line into "deploy"
#ln -s {OPENSHIFT_DATA_DIR} {OPENSHIFT_REPO_DIR}/php/data
/********************************************/
function show()
{
	global $data_dir, $img_dir, $shortcut_dir, $temp_dir;

	$q1 = $data_dir;
	$result1 = `cd "$q1" && ls -a`;
	$result1 = "data_dir: ".$result1;
	echo $result1;

	$q2 = $data_dir.'/'.$img_dir;
	$result2 = `cd "$q2" && ls -a`;
	$result2 = "img_dir: ".$result2;
	echo $result2;

	$q3 = $data_dir.'/'.$shortcut_dir;
	$result3 = `cd "$q3" && ls -a`;
	$result3 = "shortcut_dir: ".$result3;
	echo $result3;

	$q4 = $data_dir.'/'.$temp_dir;
	$result4 = `cd "$q4" && ls -a`;
	$result4 = "temp_dir: ".$result4;
	echo $result4;
}
?>