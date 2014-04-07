<?php
/********************************
This is a .PHP file for CSCI4140 assignment 2.
In this file, all the php function call is inclued.
*********************************/

/***These functions are for PHP-MYSQL part***/
$db_host = $_ENV{'OPENSHIFT_MYSQL_DB_HOST'};
$db_username = $_ENV{"OPENSHIFT_MYSQL_DB_USERNAME"};
$db_password = $_ENV{"OPENSHIFT_MYSQL_DB_PASSWORD"};
$db_name = $_ENV{"OPENSHIFT_APP_NAME"};

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

		$query2 = $db_obj->prepare("SET GLOBAL time_zone = '-5:00';");
		$query2->execute();
	}
	catch(PDOException $e)
	{
		echo "Someting went wrong when creating the database...";
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
		echo "Someting went wrong when dropping the database...";
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

		$query = $db_obj->prepare("CREATE TABLE file (file_name CHAR(255), file_size INT, upload_time TIMESTAMP(14), img_description CHAR(255), img_path CHAR(255), shortcut_path CHAR(255), PRIMARY KEY(file_name));");
		$query->execute();
	}
	catch(PDOException $e)
	{
		echo "Someting went wrong when creating the table...";
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
	}
	catch(PDOException $e)
	{
		echo "Someting went wrong when executing the query...";
	}
	$db_obj = NULL;
}
/********************************************/

?>